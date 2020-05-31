const express=require('express');
const path=require('path');
const port=3000;


const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactList =[
    {
        name: "Muskan Goel",
        phone: "012345789"
    },
    {
        name: "Muskan Kapoor",
        phone: "0987654321"
    },
    {
        name: "Lakshay Goel",
        phone: "0123411239"
    },
    {
        name: "Nidhi Goel",
        phone: "9876035818"
    },

]

app.get('/',function(req,res)
{
    //find a contact
    Contact.find({},function(err,contacts){
        if(err)
        {
          console.log('error in fetching contacts from db');
          return;
        }
        return res.render('home',{
            title:"Contacts List",
            contact_list: contacts
        });
    });
   
});

//finding a contact -2

// app.get('/search-contact',function(req,res)
// {
//     //find a contact
//     Contact.find({id},function(err,contacts){
//         if(err)
//         {
//           console.log('error in fetching contacts from db');
//           return;
//         }
//         return res.render('home',{
//             title:"Contacts List",
//             contact_list: contacts
//         });
//     });
   
// });


app.get('/practice',function(req,res)
{
    return res.render('practice',{
        title: "Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){
   
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    //alternative
   // contactList.push(req.body);
   Contact.create({
       name: req.body.name,
       phone: req.body.phone
   }, function(err, newContact){
       if(err)
       {
           console.log('error in creating a contact!');
           return;
        }
        console.log('*********',newContact);
        return res.redirect('back');
   });
    // return res.redirect('back');
});
//for deleting a contact

app.get('/delete-contact/',function(req,res){

    //get the query from the url
    //get the id from query in the url
    //console.log(req.query);
    let id=req.query.id;
    // let contactIndex =contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex !=-1)
    // {
    //     contactList.splice(contactIndex, 1);
    // }

    Contact.findByIdAndDelete(id, function(err){
        if(err)
        {
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
 
    });
    
});


// //update the contact

// app.get('/:contact_id', function(req, res) {
// 	contactList.findById(req.params.contact_id, function(err, contact) {
// 		if (contactList === null) {
// 			res.json({ success: 0 });
// 			// console.log({ message: 'Contact does not exist, update failed'});
// 		}
// 		else {
//             if(err)
//             {
//                 console.log("error in running the server",err);
//             }
// 			else {
// 				contactList.first_name = req.body.first_name;	// set the contact first_name (comes from the request)
// 				contactList.last_name = req.body.last_name;		// set the contact last_name (comes from the request)
// 				contactList.phone = req.body.phone;				// set the contact phone (comes from the request)
// 				contactList.mobile = req.body.mobile;			// set the contact mobile (comes from the request)
// 				contactList.email = req.body.email;				// set the contact email (comes from the request)
// 				contactList.address = req.body.address;			// set the contact address (comes from the request)

// 				contactList.save(function(err) {
//                     if(err)
//                     {
//                         console.log("error in running the server",err);
//                     }
// 					else
// 						res.json({ success: 1 });
// 				});	
// 			}
// 		}
// 	});
// });

app.listen(port,function(err)
{
    if(err)
    {
        console.log("error in running the server",err);
    }
    console.log("Yipee!my express is working ",port);
});