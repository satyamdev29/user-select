const rootHandle = document.getElementById('root')
    const usersData = [
            {id: 1, img:'./img/female.png', name:'Marina Augstine', email:'marina.augstina@gmail.com'},
            {id: 2, img:'./img/male.png', name:'Nick Giannopoulos', email:'nick.giannopoulos@gmail.com'},
            {id: 3, img:'./img/female.png', name:'Megan Smith', email:'megan.smith@gmail.com'},
            {id: 4, img:'./img/male.png', name:'Satya', email:'vikas@gmail.com'},
            {id: 5, img:'./img/male.png', name:'ani', email:'ani@gmail.com'},
            {id: 6, img:'./img/male.png', name:'dev', email:'dev@gmail.com'},
            {id: 7, img:'./img/female.png', name:'romi', email:'romi@gmail.com'}
        ]
    class Userlist extends React.Component{
        constructor(props){
            super(props)
            this.state={
                users:  props.users, 
                filterUsers: props.users,
                selectedUsers: []
            }
        }

    handleChange = (e) => {
        //console.log(this.state.users)
        const search = e.target.value
        //console.log(search)
        this.setState((prevState) => ({ 
        users: prevState.filterUsers.filter(user => user.name.toLowerCase().includes(search.toLowerCase())) 
        }))
    }

    handleClickSelectUser = (user) => {        
        const userFound = this.state.selectedUsers.find(u => u.id == user.id)
        if(!userFound) {
            this.setState((prevState) => ({
               selectedUsers: [...prevState.selectedUsers, user],
               users: prevState.users.filter(u => u.id != user.id)
            }))
        }
    }

    handleRemove = (user) => {
        this.setState((prevState) => ({
            selectedUsers: prevState.selectedUsers.filter(u => u.id != user.id),
            users: [...prevState.users, user]
        }))
    }

    handleFocus = () =>{
        const displayUser=document.getElementById('userList')
        if(displayUser.style.display!=="block"){
            displayUser.style.display="block"
        }
    }

    render(){
        console.log(this.state)
            return(
                <React.Fragment>
                    <h1>Chips Input Component</h1>  
                    <section className="chips__input">
                        <input type="text" name="txtChipsInput" id="txtChipsInput" placeholder="Search user" onChange={this.handleChange} onClick={this.handleFocus} />
                    <div className="chips__input_lists">
                        <ul className="selectedUsers__List"> 
                            { this.state.selectedUsers.sort(function(a,b){
                                return a.name - b.name
                                }).map(user => {
                                return <li className="selectedUsers__List_items" key={`${user.id}`}><img src={user.img}/><span className="selectedUsers__List_items--name">{user.name}</span> <span onClick={() => {
                                this.handleRemove(user)
                                }} className="closeButton">X</span></li> 
                            })}
                        </ul>

                            <ul className="chips__input_lists-items" id="userList">
                                {
                                this.state.users.sort((a,b) => a.name - b.name).map((user, index) => {
                                    return (
                                        <li className="chips__input_lists-item" key={`${user.id}`} onClick={() => {
                                            this.handleClickSelectUser(user)
                                        }}>
                                            <img src={user.img}/>
                                            <span className="chips__input_lists-item--name">{user.name}</span>
                                            <span className="chips__input_lists-item--email">{user.email}</span>
                                        </li>
                                        )
                                    }) 
                                }
                            </ul>
                    </div>
            </section>
    </React.Fragment>
                )
            }
        }
        ReactDOM.render(<Userlist users={usersData}/>, rootHandle)