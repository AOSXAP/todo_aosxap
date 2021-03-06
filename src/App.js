import './App.css';
import React,{useEffect, useState} from 'react';


function keygenerate(){
  let o = Math.floor(Math.random()*566609879879789700);
  return o;
}
 

function App() {
  const [posts, setPosts] = useState([]);

  const addpost = () => {
    var input = document.getElementById("inp").value;
    if(input!='') {setPosts(posts.concat({ name: input, key: keygenerate() }));
    document.querySelector(".Alert").style.display = "none";}
    else{document.querySelector(".Alert").style.display="block"}
    document.getElementById("inp").value = '';
  };

  useEffect(() => {
    console.log(posts);
  });

  const edit = (e) => {
    var elnew = document.getElementById(`inp${e.target.parentElement.parentElement.id}`).value;
    setPosts(
    posts.map(el => 
        el.key==e.target.parentElement.parentElement.id
        ? {...el, name : elnew} 
        : el 
  ))
  }

  const RenderList = (props) => {
    const remove = (e) => {
      setPosts(
        props.list.filter((id) => {
          return id.key != e.target.parentElement.id;
        })
      );
    };

    return props.list.map((el) => {
      var inpid = 'inp' + el.key;
      return (
        <div
          id={el.key}
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0px",
          }}
        >
          <h1>{el.name}</h1>

          <div id={inpid + 'x'} style={{display:"none",alignSelf:"center"}}>
          <input id= {inpid}></input>
          <button onClick={edit}>edit</button>
          </div>
          
          <button
            style={{ height: "30px", alignSelf: "center" }}
            onClick={remove}
          >
            remove
          </button>

          <button
            style={{ height: "30px", alignSelf: "center" }}
            onClick={ () => {document.getElementById(inpid + 'x').style.display="block"}}
          >
            edit
          </button>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1 className="start">Todo App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input placeholder="Add Todo..." id="inp"></input>
        <button onClick={addpost} type="button">
          Submit
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            setPosts([]);
          }}
          style={{ margin: "20px" }}
        >
          Remove All
        </button>
        <h1 style={{display:"none"}} className="Alert">Write something before submiting</h1>
      </form>
      <RenderList list={posts} />
    </div>
  );
}



export default App;
