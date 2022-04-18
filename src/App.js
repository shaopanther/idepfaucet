import React from 'react';
import './App.css';
import Recaptcha from 'react-recaptcha';
import Account from './Account';
/**
 * App
 *
 * Simple react js fetch example
 */
class App extends React.Component {

    /**
     * constructor
     *
     * @object  @props  parent props
     * @object  @state  component state
     */
    constructor(props) {
        
        super(props);

        this.state = {
            // items: [],
            msg: {},
            res:'',
            isVerified: false,
            account:true,
            info:'',
            account_number:'',
            mnemonic:'',
            name:'',
            pubkey:'',
            show:false

        }

        this.test=this.test.bind(this);
        this.mySubmitHandler=this.mySubmitHandler.bind(this);
        this.myChangeHandler=this.myChangeHandler.bind(this);
        this.mySubmitHandler1=this.mySubmitHandler1.bind(this);
        this.myChangeHandler1=this.myChangeHandler1.bind(this);
        this.recaptchaLoaded1 = this.recaptchaLoaded1.bind(this);
        this.verifyCallback1 = this.verifyCallback1.bind(this);
        this.recaptchaLoaded2 = this.recaptchaLoaded2.bind(this);
        this.verifyCallback2 = this.verifyCallback2.bind(this);

    }
    recaptchaLoaded1() {
      console.log('capcha successfully loaded');
    }
    recaptchaLoaded2() {
      console.log('capcha successfully loaded');
    }
    
    mySubmitHandler = (event) => {
      event.preventDefault();
      if (this.state.isVerified) {
        this.setState({
          message: 'Loading....'
        });
       
        const res= this.test(this.state.username);
      } else {
        alert('Please verify that you are a human!');
      }
     
      // console.log(res);
      
    }
    mySubmitHandler1 = (event) => {
      event.preventDefault();
      
       console.log(this.state.username1);
       const add= this.test1(this.state.username1);
     
     
      
    }
    verifyCallback1(response) {
      if (response) {
        this.setState({
          isVerified: true
        })
      }
    }
    verifyCallback2(response) {
      if (response) {
        this.setState({
          isVerified: true
        })
      }
    }
    
    myChangeHandler = (event) => {
      this.setState({username: event.target.value});
    }
    myChangeHandler1 = (event) => {
      this.setState({username1: event.target.value});
    }

  async test(n) {
      
       const data= {"accAddress": n };
       const rawResponse = await fetch('api1', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
       });
      const te= await rawResponse.json();
      if(te){
        // console.log(te.res.txhash);
          this.setState({
        msg: te.msg,
        res: te.res.txhash,
        isLoaded: true
      });
      
      }
      
     
   };
   async test1(n1) {
    const data1= {"accName": n1};
    const rawResponse = await fetch('api2', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data1)
    });
   const te1= await rawResponse.json();
   if(te1){
     console.log(te1.msg);
       this.setState({
     info: te1.msg,
     account_number: te1.res.accAddress,
     mnemonic:te1.res.mnemonic,
     name:te1.res.name,
     pubkey:te1.res.pubkey,
     show:true,
     isLoaded: true
   });
   
   }
   
  
    };
  
    render() {

        const { isLoaded } = this.state;
        let { account } = this.state;
        let { show } = this.state;

        if (!isLoaded){
          return (
            <div className="container  mt-4">
            <div className="row">
              <div className="col-md-8">
            <div className="jumbotron">
              <h1> Faucet</h1>
              <h3>What is the Faucet?</h3>
              <p className="text-justify cc">The faucet is a web-based service that provides test ada to users of the testnet. While these tokens have no 'real world' value, they enable users to experiment with Cardano testnet features, without having to spend real ada on the mainnet.</p>
            <h3>To request tokens using the faucet:</h3>
            <p className="text-justify cc"> 1) Enter the address of the account where you want to top up funds.</p>
            <p className="text-justify cc"> 2) If you have been issued with an API key, please enter this to access any additional funds you may have been allocated.</p>
            <p className="text-justify cc"> 3) Click <strong>Request funds</strong>.</p>
            <p className="text-justify cc"> 4) Funds will be in the testnet account you specified within a few minutes</p>
            <p className="text-justify cc">We have applied a daily faucet limit of 1000 test ada a day for each testnet user to ensure everyone has access to funds.</p>
             <form onSubmit={this.mySubmitHandler}>
                <div class="form-group">
                <label className="cc">Enter Account Address to get Tidep</label>
                <input
                  type='text'
                  placeholder="Enter Account Address"
                  className="form-control col-md-4"
                  onChange={this.myChangeHandler}
                  required
                />
                <input
                  type='submit'
                  className="btn btn-info mt-3"
                />
                   <Recaptcha
                   elementID="a1"
                  sitekey="6Le_SZAcAAAAANMWdmDJKQgoaF1QwXWZR6I9Ulxi"
                  render="explicit"
                  onloadCallback={this.recaptchaLoaded1}
                  verifyCallback={this.verifyCallback1}
                />
                </div>
                </form>
          <h2 className="mt-3"> {this.state.message}</h2>
          <p className="text-justify cc">When you have finished using your test tokens, please return them to the faucet so that other members of the community can use them. Please return your test tokens to this address:</p>
           <p className="text-dark cc1"><strong>addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3</strong></p>
            </div>
            </div>
            <div className="col-md-4 pt-5">
              <h1>Create Wallet</h1>
              <p className="text-dark cc"><strong>TO create new wallet please fill the below form</strong></p>
              <p className="text-danger"><strong>* Please save information somewhere safe after account got created!</strong></p>
            <form onSubmit={this.mySubmitHandler1}>
            <div className="form-group">
            <label  className="cc">Enter UserName</label>
            <input
              type='text'
              placeholder="Enter User Name"
              className="form-control col-md-4"
              onChange={this.myChangeHandler1}
              required
            />
             <Recaptcha
             elementID="a2"
                  sitekey="6Le_SZAcAAAAANMWdmDJKQgoaF1QwXWZR6I9Ulxi"
                  render="explicit"
                  onloadCallback={this.recaptchaLoaded2}
                  verifyCallback={this.verifyCallback2}
                />
            <input
              type='submit'
              className="btn btn-info mt-3"
            />
            </div>
            </form>
            </div>
            </div>
            </div>
        );
        }
        else if(show){
          return (
            // 
            <div className="container mt-4">
                  <div className="row">
                  <div className="offset-md-2 col-md-8 offset-md-2">
                  <div className="App">
              
                    <div class="card mt-3">
                  <div class="card-header">
                    Information: <h4> {this.state.info}</h4>
                  </div>
                  <div class="card-body">
                  <h6 class="card-title">Name: {this.state.name}</h6>
                  <h6 class="card-title">Account Address: {this.state.account_number}</h6>
                  <h6 class="card-title">Mnemonic: {this.state.mnemonic}</h6>
                  <h6 class="card-title">Pubkey: {this.state.pubkey}</h6>
                  <button className="btn btn-warning" onClick={() => window.location.reload(false)}>Click to reload!</button>
                    
                  </div>
                </div>
                
                  </div>
                  </div>
                  </div>
                 
             </div>
         
        );
        }else{
          return (
            // 
            <div className="container mt-4">
                  <div className="row">
                  <div className="offset-md-2 col-md-8 offset-md-2">
                  <div className="App">
              
                    <div class="card mt-3">
                  <div class="card-header">
                    Information
                  </div>
                  <div class="card-body">
                  <h5 class="card-title">Response: {this.state.msg}</h5>
                  <h5 class="card-title">Txhash {this.state.res}</h5>
                  <button className="btn btn-warning" onClick={() => window.location.reload(false)}>Click to reload!</button>
                    
                  </div>
                </div>
                
                  </div>
                  </div>
                  </div>
                 
             </div>
         
        );
        }

      

    }

}

export default App;