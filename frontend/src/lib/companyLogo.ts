export function getCompanyLogo(company: string): string {
  const normalized = company.trim().toLowerCase();

  const logoMap: Record<string, string> = {
    revoult: "/Logo.png",
    revoultx: "/Logo.png",
    dropbox: "/Logo.png",
    pitch: "/Logo.png",
    blinklist: "/Logo.png",
    classpass: "/Logo.png",
    canva: "/Logo.png",
    godaddy: "/Logo.png",
    twitter: "/Logo.png",
    nomad: "/Logo.png",
    netlify: "/Logo.png",
    maze: "/Logo.png",
    terraform: "/Logo.png",
    udacity: "/Logo.png",
    packer: "/Logo.png",
    webflow: "/Logo.png",
    intel: "/intel-3.png",
    tesla: "/Logo.png",
    vodafone: "/vodafone-2017-logo.png",
    amd: "/amd-logo-1.png",
    talkit: "/Logo.png",
    google: "/intel-3.png",
    microsoft: "/amd-logo-1.png",
    amazon: "/vodafone-2017-logo.png",
    apple: "/Logo.png",
    meta: "/candidate-placeholder.svg",
  };

  const matchedKey = Object.keys(logoMap).find((key) => normalized.includes(key));

  if (matchedKey) {
    return logoMap[matchedKey];
  }

  return "/Logo.png";
}
