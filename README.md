#<font color="teal">XMeme</font>

This project is a developed for CWoD. For more details visit ***[`https://crio.do`](https://crio.do)***<br>

####View this project live on <br>
Frontend ***[https://xmeme-front.netlify.app](https://xmeme-front.netlify.app)*** <br>
Backend ***[https://xmeme-back.herokuapp.com](https://xmeme-back.herokuapp.com)***<br>
Swagger-UI ***[https://xmeme-back.herokuapp.com/swagger-ui](https://xmeme-back.herokuapp.com/swagger-ui)***<br>

##### It can be used to :
    1. View Memes.
    2. Add a Meme.
    3. Update a Meme.
    4. Share a meme.
<font color="teal"><i>This project also has SSE, so as soon as a new meme is added by someone the user will be notified.</i></font>
<br>

##### Here is the GIF of the Memes page
![Demo GIF](./demo.gif)
<br>
----

## <font color="teal">How to use this project</font>
Clone this repository and open the terminal from root project directory.
Follow the steps mentioned below according to your need.

##### <font color="teal">Run the frontend</font>
* Run `cd frontend` to get into the client application.
* Run *`npm i`* to install all the dependencies.
* Now run `npm start`. It'll start the server on [http://localhost:3000](http://localhost:3000).

##### <font color="teal">Run the backend</font>
* Run `cd backend` to get into the server application.
* Run *`npm i`* to install all the dependencies.
* Now run `npm start`. It'll start the API server on [http://localhost:8081](http://localhost:8081) and Swagger-UI at [http://localhost:8080/swagger-ui](http://localhost:8080/swagger-ui).
* Test API server by a get request to [http://localhost:8081/ping](http://localhost:8081/ping)