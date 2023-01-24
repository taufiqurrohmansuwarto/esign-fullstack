const isProd = process.env.NODE_ENV === "production";

if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
}

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
