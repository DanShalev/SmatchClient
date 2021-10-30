import Axios from "axios";


const smatchServer = Axios.create({
  baseURL: "http://ec2-18-188-126-103.us-east-2.compute.amazonaws.com:8080"
});

export default smatchServer;
