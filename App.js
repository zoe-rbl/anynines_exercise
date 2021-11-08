//import of necessary library
import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Form, Header} from 'semantic-ui-react';

// main function of the application, which generate some html-code
function App() {

  //variable declaration
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [repos, setRepos] = useState('');
  const [UserInput, setUserInput] = useState('');
  const [AllData, setAllData] = useState([]);
  const [FilteredName, setFilteredName] = useState(AllData);

    // methode declaration, set the data which are 
    // recovered by the Github API
    const setData = ({ 
      name, 
      login, 
      public_repos, 
      avatar_url}) => {

      setName(name);
      setUsername(login);
      setAvatar(avatar_url);
      setRepos(public_repos);

    };

    //method that takes an event (e) as parameter, 
    //sets a UserInput and a target value, and will 
    //handle the search each time something is typed
    //in the search bar 
    const handleSearch = e => {
      let value = e.target.value.toLowerCase();
      let result = [];
      console.log(value);
      result = AllData.filter((data) => {
        return data.login.search(value) !== -1;
      });

      setFilteredName(result);
      setUserInput(e.target.value)
    };

    //Function active when clicking on the submit
    //button it then retrieves the data from the 
    //Github API 
    const handleSubmit = () => {
      fetch(`https://api.github.com/users/${UserInput}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
    };

    //method that retrieves data 
    //from the Github API each time the page loads
    useEffect(() => {
      fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(data => {
         console.log(data);
        setAllData(data);
        setFilteredName(data);
      });
    }, [])


  /**
   * HTML which is generate in the return statements :
   * -> a search bar for searching some github-username,
   * it is put in a Form (from semantic-ui)
   * -> a content to return the data of a user, 
   * it is put in a Container (from semantic-ui)
   * 
   */
  
  return (
    <div>
      
       <div className="navbar"> Search some Github users ! </div>
       <br/>
        <div className='search'>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input type="text" placeholder='Username' name='name' onChange={handleSearch} />
              <Form.Button content='Submit' />
          
          </Form.Group>
        </Form>
      </div>

        <div className="filteredName">
          {FilteredName.map((value,  index) =>{
            return (
              <div key={value.id}>
                {value.login}
              </div>

            )
          })}
      </div>
      
      <br/>

      <div className='container'>
      <Container text>
        
        <Header as='h2'>Result for {userName} : </Header>
          
        <p>  
          [ <br/>
            &#8194;  &#123; <br/>
            &#8195; "name": "{name}", <br/>
            &#8195;  "username": "{userName}", <br/>
            &#8195;  "avatar": "{avatar}“, <br/>
            &#8195;  "repo": &#123;"number of repos": "{repos}"&#125;, <br/>
            &#8195;  "description": "project description", <br/>
            &#8195;  "url": "https://api.github.com/{userName}" <br/>

            &#8194; &#125; , <br/>
            ... <br/>
          ]
        </p>
      </Container>
      </div>
    </div>
      
      
     
  );
}
export default App;
