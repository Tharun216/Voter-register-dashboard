import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {getFirestore,doc,getDoc,setDoc} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const firebaseConfig={apiKey:'AIzaSyCSrYuQJZ5eu3nyLzITA23FY3o4XcSABAQ',authDomain:'voter-register-dashboard.firebaseapp.com',projectId:'voter-register-dashboard',storageBucket:'voter-register-dashboard.firebasestorage.app',messagingSenderId:'372383742030',appId:'1:372383742030:web:5e1389a2906a8af5c46b1f',measurementId:'G-LTZYW0PPGD'};
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
export function startBridge({load,localSnapshot,setStatus}){
 const gate=document.getElementById('firebaseGate'),form=document.getElementById('firebaseLogin'),message=document.getElementById('firebaseMessage'),layout=document.getElementById('appLayout'),upload=document.getElementById('firebaseUpload'),logout=document.getElementById('firebaseLogout');
 let user=null,ready=false,cloudExists=false,writeChain=Promise.resolve(),remoteRef=null;
 const initialLocal=localSnapshot();
 function status(s){setStatus(s);message.textContent=s}
 function locked(){ready=false;user=null;layout.style.display='none';gate.style.display='flex';upload.hidden=true;logout.hidden=true;status('Sign in to access the dashboard')}
 locked();
 form.addEventListener('submit',async e=>{e.preventDefault();const email=form.elements.email.value.trim(),password=form.elements.password.value;status('Signing in…');try{await signInWithEmailAndPassword(auth,email,password);form.elements.password.value=''}catch(err){status('Login failed: '+err.message)}});
 logout.addEventListener('click',async()=>{await signOut(auth)});
 onAuthStateChanged(auth,async current=>{
  if(!current){locked();return}
  ready=false;user=current;remoteRef=doc(db,'users',current.uid,'dashboard','main');status('Loading online records…');
  try{const snap=await getDoc(remoteRef);if(auth.currentUser?.uid!==current.uid)return;
   cloudExists=snap.exists();if(cloudExists){const value=snap.data();if(!Array.isArray(value.records)||!Array.isArray(value.history))throw Error('Unexpected online data format');load(value.records,value.history)}else{load([],[])}
   ready=true;gate.style.display='none';layout.style.setProperty('display','flex','important');logout.hidden=false;upload.hidden=cloudExists;setStatus(cloudExists?'Online · records loaded':'Online · empty database (local backup not uploaded)');
  }catch(err){ready=false;status('Unable to load records. Check your Firestore rules and internet connection: '+err.message)}
 });
 upload.addEventListener('click',async()=>{if(!ready||cloudExists)return;const snapshot=initialLocal;if(!snapshot.records.length){alert('No local records to upload. You can restore a JSON backup first.');return}if(!confirm('Upload '+snapshot.records.length+' records from this browser to your online database? Only use dummy records until privacy and security checks are complete.'))return;try{await setDoc(remoteRef,{...snapshot,updatedAt:new Date().toISOString()});cloudExists=true;load(snapshot.records,snapshot.history);upload.hidden=true;setStatus('Online · local records uploaded')}catch(err){alert('Upload failed: '+err.message)}});
 return {save(snapshot){if(!ready||!user)return;writeChain=writeChain.catch(()=>{}).then(async()=>{if(!auth.currentUser||auth.currentUser.uid!==user.uid)return;await setDoc(remoteRef,{...snapshot,updatedAt:new Date().toISOString()});cloudExists=true;upload.hidden=true;setStatus('Online · saved')}).catch(err=>{setStatus('Cloud save failed · download a backup');alert('Online save failed: '+err.message)});},isReady(){return ready}};
}
