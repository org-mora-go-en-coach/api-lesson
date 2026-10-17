import type { NextConfig } from "next";
const cors=[{key:"Access-Control-Allow-Origin",value:"*"},{key:"Access-Control-Allow-Methods",value:"GET,PATCH,OPTIONS"},{key:"Access-Control-Allow-Headers",value:"Content-Type"}];
const config:NextConfig={agentRules:false,async headers(){return[{source:"/api/:path*",headers:cors}]}}; export default config;

