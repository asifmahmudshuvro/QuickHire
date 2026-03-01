export function getCompanyLogo(company: string): string {
  const normalized = company.trim().toLowerCase();

  const logoMap: Record<string, string> = {
    revoult: "https://logo.clearbit.com/revolut.com",
    revoultx: "https://logo.clearbit.com/revolut.com",
    dropbox: "https://logo.clearbit.com/dropbox.com",
    pitch: "https://logo.clearbit.com/pitch.com",
    blinklist: "https://logo.clearbit.com/blinkist.com",
    classpass: "https://logo.clearbit.com/classpass.com",
    canva: "https://logo.clearbit.com/canva.com",
    godaddy: "https://logo.clearbit.com/godaddy.com",
    twitter: "https://logo.clearbit.com/x.com",
    nomad: "https://logo.clearbit.com/nomadlist.com",
    netlify: "https://logo.clearbit.com/netlify.com",
    maze: "https://logo.clearbit.com/maze.co",
    terraform: "https://logo.clearbit.com/hashicorp.com",
    udacity: "https://logo.clearbit.com/udacity.com",
    packer: "https://logo.clearbit.com/hashicorp.com",
    webflow: "https://logo.clearbit.com/webflow.com",
    intel: "https://logo.clearbit.com/intel.com",
    tesla: "https://logo.clearbit.com/tesla.com",
    vodafone: "https://logo.clearbit.com/vodafone.com",
    amd: "https://logo.clearbit.com/amd.com",
    talkit: "https://logo.clearbit.com/talkit.com",
  };

  const matchedKey = Object.keys(logoMap).find((key) => normalized.includes(key));

  if (matchedKey) {
    return logoMap[matchedKey];
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=EEF2FF&color=4F46E5&bold=true&size=64`;
}
