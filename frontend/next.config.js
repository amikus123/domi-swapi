
const path = require("path")
require("dotenv").config()



const nextConfig = {
  env:{
    API_URL:process.env.API_URL
  },
  publicRuntime :{
    API_URL:process.env.API_URL,
  },
  webpack:config=>{
    config.resolve.alias["components"] = path.join(__dirname,"components")
    config.resolve.alias["public"] = path.join(__dirname,"public")
    return config
  },
  images: {
    loader: "default",
    domains: ["localhost"],
  },
}

module.exports = nextConfig
