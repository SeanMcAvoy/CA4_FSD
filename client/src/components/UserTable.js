import React, {Component} from "react"
import UserTableRow from "./UserTableRow"
import "../css/Table.css"

export default class UserTable extends Component 
{
    render() 
    {
        console.log("Users")
        console.log(this.props.users)
 
        return (

         
            <table id = "uTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Access Level</th>
                     
                        <th> </th>
                    </tr>
                </thead>
                  
                <tbody>
                {this.props.users.map((car) => <UserTableRow key={car._id} user={car}/>)}
                </tbody>
            </table>      
        )
    }
}