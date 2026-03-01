$ErrorActionPreference='Stop'

function Invoke-Api {
  param(
    [string]$Method,
    [string]$Url,
    $Body = $null,
    $Headers = @{}
  )

  $status = 0
  $content = ''

  if (-not $Headers) {
    $Headers = @{}
  }

  if (-not $Headers.ContainsKey('Accept')) {
    $Headers['Accept'] = 'application/json'
  }

  try {
    if ($null -ne $Body) {
      $jsonBody = $Body | ConvertTo-Json -Depth 10
      $resp = Invoke-WebRequest -UseBasicParsing -Method $Method -Uri $Url -Headers $Headers -ContentType 'application/json' -Body $jsonBody
    } else {
      $resp = Invoke-WebRequest -UseBasicParsing -Method $Method -Uri $Url -Headers $Headers
    }

    $status = [int]$resp.StatusCode
    $content = $resp.Content
  } catch {
    $resp = $_.Exception.Response
    if ($resp) {
      $status = [int]$resp.StatusCode
      $reader = New-Object System.IO.StreamReader($resp.GetResponseStream())
      $content = $reader.ReadToEnd()
      $reader.Close()
    } else {
      throw
    }
  }

  $parsed = $null
  if ($content -and $content.Trim().StartsWith('{')) {
    try { $parsed = $content | ConvertFrom-Json } catch { $parsed = $null }
  }

  return @{
    Status = $status
    Json = $parsed
    Raw = $content
  }
}

function Assert-Test {
  param(
    [string]$Name,
    [bool]$Condition,
    [string]$Detail
  )

  if ($Condition) {
    Write-Output "PASS | $Name | $Detail"
  } else {
    Write-Output "FAIL | $Name | $Detail"
    $script:HasFail = $true
  }
}

$base = 'http://127.0.0.1:8000/api'
$script:HasFail = $false

$r1 = Invoke-Api -Method 'GET' -Url "$base/jobs"
$count = if ($r1.Json -and $r1.Json.data) { @($r1.Json.data).Count } else { 0 }
Assert-Test -Name 'GET /api/jobs' -Condition ($r1.Status -eq 200 -and $count -ge 1) -Detail "status=$($r1.Status), count=$count"

$jobId = if ($count -ge 1) { [int]$r1.Json.data[0].id } else { 0 }

$r2 = Invoke-Api -Method 'GET' -Url "$base/jobs/$jobId"
$detailId = if ($r2.Json -and $r2.Json.data) { [int]$r2.Json.data.id } else { -1 }
Assert-Test -Name 'GET /api/jobs/{id}' -Condition ($r2.Status -eq 200 -and $detailId -eq $jobId) -Detail "status=$($r2.Status), id=$detailId"

$r3 = Invoke-Api -Method 'POST' -Url "$base/jobs" -Body @{title='Unauthorized Job';company='NoAuth';location='Remote';category='Test';description='Should fail'}
Assert-Test -Name 'POST /api/jobs (no token)' -Condition ($r3.Status -eq 401) -Detail "status=$($r3.Status)"

$r4 = Invoke-Api -Method 'POST' -Url "$base/auth/login" -Body @{email='admin@quickhire.test';password='admin12345'}
$adminToken = if ($r4.Json -and $r4.Json.data) { [string]$r4.Json.data.token } else { '' }
Assert-Test -Name 'POST /api/auth/login (admin)' -Condition ($r4.Status -eq 200 -and $adminToken.Length -gt 20) -Detail "status=$($r4.Status), tokenLen=$($adminToken.Length)"

$adminHeaders = @{ Authorization = "Bearer $adminToken" }

$newJob = @{title='Smoke Backend Engineer';company='QuickHire Smoke';location='Remote';category='Engineering';description='Smoke test create job endpoint'}
$r5 = Invoke-Api -Method 'POST' -Url "$base/jobs" -Body $newJob -Headers $adminHeaders
$createdId = if ($r5.Json -and $r5.Json.data) { [int]$r5.Json.data.id } else { 0 }
Assert-Test -Name 'POST /api/jobs (admin)' -Condition ($r5.Status -eq 201 -and $createdId -gt 0) -Detail "status=$($r5.Status), createdId=$createdId"

$r6 = Invoke-Api -Method 'DELETE' -Url "$base/jobs/$createdId" -Headers $adminHeaders
Assert-Test -Name 'DELETE /api/jobs/{id} (admin)' -Condition ($r6.Status -eq 200) -Detail "status=$($r6.Status)"

$r7 = Invoke-Api -Method 'POST' -Url "$base/applications" -Body @{job_id=$jobId;name='Smoke Applicant';email='smoke.applicant@example.com';resume_link='https://example.com/resume';cover_note='Smoke application note'}
$appId = if ($r7.Json -and $r7.Json.data) { [int]$r7.Json.data.id } else { 0 }
Assert-Test -Name 'POST /api/applications (valid)' -Condition ($r7.Status -eq 201 -and $appId -gt 0) -Detail "status=$($r7.Status), appId=$appId"

$r8 = Invoke-Api -Method 'POST' -Url "$base/applications" -Body @{job_id=$jobId;name='Bad Applicant';email='bad-email';resume_link='not-a-url';cover_note='Bad'}
Assert-Test -Name 'POST /api/applications (invalid)' -Condition ($r8.Status -eq 422) -Detail "status=$($r8.Status)"

$stamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$userEmail = "user$stamp@quickhire.test"
$r9a = Invoke-Api -Method 'POST' -Url "$base/auth/user/register" -Body @{name='Smoke User';email=$userEmail;password='user12345';password_confirmation='user12345'}
$userToken = if ($r9a.Json -and $r9a.Json.data) { [string]$r9a.Json.data.token } else { '' }
$okRegister = ($r9a.Status -eq 201 -and $userToken.Length -gt 20)
Assert-Test -Name 'POST /api/auth/user/register' -Condition $okRegister -Detail "status=$($r9a.Status), tokenLen=$($userToken.Length)"

$userHeaders = @{ Authorization = "Bearer $userToken" }
$r9b = Invoke-Api -Method 'POST' -Url "$base/jobs" -Body @{title='User Should Fail';company='QuickHire';location='Remote';category='Engineering';description='forbidden'} -Headers $userHeaders
Assert-Test -Name 'POST /api/jobs (user token)' -Condition ($r9b.Status -eq 403) -Detail "status=$($r9b.Status)"

$r10a = Invoke-Api -Method 'GET' -Url "$base/auth/me" -Headers $adminHeaders
$isAdmin = if ($r10a.Json -and $r10a.Json.data) { [bool]$r10a.Json.data.is_admin } else { $false }
Assert-Test -Name 'GET /api/auth/me (admin)' -Condition ($r10a.Status -eq 200 -and $isAdmin) -Detail "status=$($r10a.Status), is_admin=$isAdmin"

$r10b = Invoke-Api -Method 'POST' -Url "$base/auth/logout" -Headers $adminHeaders
Assert-Test -Name 'POST /api/auth/logout (admin)' -Condition ($r10b.Status -eq 200) -Detail "status=$($r10b.Status)"

if ($script:HasFail) {
  Write-Output 'SMOKE_RESULT=FAIL'
  exit 1
} else {
  Write-Output 'SMOKE_RESULT=PASS'
}
