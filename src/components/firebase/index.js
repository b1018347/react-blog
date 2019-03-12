import app from 'firebase/app';
import 'firebase/database';
import config from 'firebaseCredentials';

class Firebase {
    constructor() {
      app.initializeApp(config);
      this.db = app.database();
    }

    blogs = () => this.db.ref(`blogs`);

}
  
export default Firebase;