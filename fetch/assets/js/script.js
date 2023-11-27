let url='http://localhost:3000/employees';
   var mainData=[];   
//get

   function loadData(){
     fetch(url)
    .then(res => res.json())
    .then(data => {
      
    mainData = data;
    getData();
    });
   }
    function getData() {
        let cont="";
      console.log(mainData);
      mainData.map(value=>{
        cont+=`<tr >
            <th scope="row">${value.id}</th>
            <td>${value.name}</td>
            <td>${value.email}</td>
            <td><button class="btn text-primary" onclick='upd(${value.id})'><i class="fa fa-edit" style="font-size:25px"></i></button></td>
            <td><button class="btn text-danger" onclick='deleteRecord(${value.id})'><i class="material-icons" style="font-size:25px">delete</i></button></td>
          </tr>`
      })
      document.getElementById('bodyy').innerHTML=cont;
    }
    //delete
    function deleteRecord(id) {
        alert("The data is deleted...!");
            fetch(`${url}/${id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error));
    }

// Post

    function give(){
        let id1=$("#uId").val();
        var id2 = parseInt(id1);
        let name1=$("#name").val();
        let mail1=$("#mail").val();
        if(id1===''&&name1===''&&mail1===''){
            alert("Please Dont give empty fields..!");
        }
        else{
            let name2={id:id2,name:name1,email:mail1};
    
            fetch(url, {
                method:'POST',
                headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(name2)
                
            }).then(response => response.json())
                    .then(data => {
                        mainData.push(data);        
                    })
                    .catch(error => {
                console.error('Error adding information:', error);
                alert("Use Unique Id");
            });
        }

    }
    
//put
    function upd(id) 
    {
        let mm = mainData.find(item => item.id === id);
        console.log(id, "      ", mainData);
        console.log("mm ", mm);
        $("#uId").val(mm.id);
        $("#name").val(mm.name);
        $("#mail").val(mm.email);
        
        $("#ubtn").css("display", "block");
        $("#sebtn").css("display", "none");
        $("#uppH").css("display", "block");
        $("#instH").css("display", "none");
        let btn = $("#ubtn");
        btn.on('click', function(event) 
        {
                console.log("hi syam");
            let idd = $("#uId").val();
            let name = $("#name").val();
            let mail = $("#mail").val();
            if(idd===''&&name===''&&mail===''){
                alert("Please Dont give empty fields..!");
            }
            else
            {

                let data = { id: idd, name: name, email: mail };
                console.log("Updating data:", data);

                fetch(`${url}/${idd}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(updatedData => {
                console.log("Updated data:", updatedData);

                $("#uId").val('');
                $("#name").val('');
                $("#mail").val('');

                $("#ubtn").hide();
                })
                .catch(err => alert(err));
                
            }
        })
    }
