/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
export default class MoviesPiChart extends Component {
         
  
        
       render() 
    {
        
       
 var no = 0;              
 var standard = 0
 var admin = 0;

 
         var user = this.props.user;
       
           user.map(access =>{
               
                  if(access.accessLevel === 0){
                    no = no + 1;
                 } 
                 else if(access.accessLevel == 1){
                   standard = standard + 1;
                 }
                 else if(access.accessLevel == 2){
                  admin = admin + 1;
                 }
              
               
            })

  
        return (
                <div>
    
    
    <div id="pi">
              <h1>Levels Of Access </h1>  

              
        <PieChart
  data={[
    { title: 'Number of Users With No Access: '+no, value: no, color: '#71eb34'},
    { title: 'Number of Users With Standard Access: '+standard, value: standard, color: '#510cf2' },
    { title: 'Number of Users With Admin Access: '+admin, value: admin, color: 'white' },

  ]}
/>
</div>


 





</div>
    )            
                
        
}
}