import Axios from 'axios';

/*
* TODO: In order to test your server connection, do one of the following:
*  1. Run your java server. You are probably running it on localhost:8080.
*  2.1 Check your computer ip (so the client phone will know how to access it):
*     "http://127.0.0.8:8080"
*  2.2 Alternatively (to step 2.1 only), you can install ngrok and use it:
*       3.1 I already installed the module as a dev dependency.
*           Just open terminal in this project root and run "npm run tunnel".
*       3.2 Note that this is an alias, in the background it actually runs "ngrok http 8080".
*           This command will share your 8080 port (java server) into the url printed by ngrok.
*       3.4 The output is a URL of the following type "http://3efed74dbba0.ngrok.io", use it.
*           Keep in mind that every 8 hours you will need to reran ngrok and change the link here in order to use it.
* */

const smatchServer = Axios.create({
    baseURL: 'http://192.168.0.101:8080'
});

export default smatchServer;
