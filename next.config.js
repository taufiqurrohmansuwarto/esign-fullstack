const isProd = process.env.NODE_ENV === "production";

function getBasePath() {
  var basePath = "";

  if (isProd && process.env.BASE_PATH) {
    if (process.env.BASE_PATH.startsWith("/")) {
      basePath = process.env.BASE_PATH;
    } else {
      basePath = "/" + process.env.BASE_PATH;
    }
  }

  return basePath;
}

const nextConfig = {
  images: {
    domains: ["siasn.bkd.jatimprov.go.id"],
    formats: ["image/webp"],
  },
  poweredByHeader: false,
  basePath: "/esign",
  publicRuntimeConfig: {
    basePath: getBasePath(),
  },
};

module.exports = nextConfig;
