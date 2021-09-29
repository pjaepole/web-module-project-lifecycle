
import React from 'react';
import Axios from 'axios';

class App extends React.Component{
  state ={
    myself:[],
    followers:[],
    input:'',
    filtered:[]
  }
  componentDidMount(){
    Axios.get('https://api.github.com/users/pjaepole')
    .then(response=>{
      this.setState({
          ...this.state,
          myself:response.data
      })
    }).catch(error=>{
      console.error(error)
    })
  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.myself !== prevState.myself){
    Axios.get('https://api.github.com/users/pjaepole/followers')
    .then(response=>{
      console.log(response.data)
      this.setState({
        ...this.state,
        followers:response.data
      })
    })
  }
}

inputHandlechange=e=>{
  this.setState({
    ...this.state,
    input: e.target.value
  })
  this.setState({
    ...this.state,
    filtered: this.state.followers.filter(function(follower){
      return follower.login.trim().toLowerCase().includes(e.target.value)
    })
  })
}
formsubmithandle=e=>{
  e.prevendDefault();
  this.setState({
    ...this.state,
    followers:this.state.filtered
    })
  }
  

  render(){
    return(
    <div className="App">

    <form onSubmit={this.formsubmithandle}>
      <input onChange={this.inputHandlechange}/>
      <button onClick={this.formsubmithandle}>search</button>
    </form>
    {this.state.filtered.length>=1?this.state.filtered.map(function(item){
      return <div key={item.id}>{item.login}</div>
    }):<div>"nothing"</div>}
      <h1>git hub user project</h1>
      <div>
          <img style={{width:"150px"}} src={this.state.myself.avatar_url}></img>
          <h2>My user name is: {this.state.myself.login}</h2>
      </div>
      <div>
        <h2>followers</h2>
        {this.state.followers.map((follower)=>{
          return (<div key={follower.id}><p>{follower.login}</p>
                  <img style={{width:"150px"}} src={follower.avatar_url}></img></div>) 
        })}
      </div>
    </div>
    )
  }
}
export default App;