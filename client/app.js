
    var server = 'http://localhost:3000'
    var emailLogin = $('#emailLogin')
    var passwordLogin = $('#passwordLogin')
    var formLogin = $('#formLogin')
    var koleksi = $('#koleksi')
    var formRegister = $('#formRegister')
    var emailRegister = $('#emailRegister')
    var nameRegister = $('#nameRegister')
    var passwordRegister = $('#passwordRegister')
    
    var Login = $('.Login')
    var Register = $('.Register')
    if(localStorage.token){
        $('#home').show()
        showComic()
        Login.hide()
        Register.hide()
        // $('#editForm').hide()
    }else{
        Login.show()
        Register.hide()
        $('#home').hide()
    }

    $('#random').on('click',()=>{
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function(data) {
              isiRegister(data)
            }
          });
    })

    function isiRegister(data){
        formRegister.find(nameRegister).val(data.results[0].name.first)
        formRegister.find(emailRegister).val(data.results[0].email)
    }
    $('#showRegister').on('click',()=>{
        Register.show()
        Login.hide()
    })
    $('#showLogin').on('click',()=>{
        Login.show()
        Register.hide()
    })
    $('#logout').on('click',function(){
        localStorage.clear()
    })

    // showComic()
    formLogin.on('submit',function(e){
        console.log(emailLogin.val())
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:`${server}/login`,
            data:{
                email:emailLogin.val(),
                password:passwordLogin.val()
            }
        })
        .done(data=>{
            console.log('masuk')
            localStorage.setItem('token',data)
            Login.hide()
            $('#home').show()
            console.log(data)
            showComic()
        })
        .fail(err=>{
            console.log(err)
        })
    })

    formRegister.on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:`${server}/register`,
            data:{
                email: emailRegister.val(),
                name: nameRegister.val(),
                password: passwordRegister.val()
            }
        })
        .done(data=>{
            console.log(data)
            Register.hide()
            Login.show()
        })
        .fail(err=>{

        })
    })


    function showComic(){
        $.ajax({
            type:'GET',
            headers:{token:localStorage.token},
            url:`${server}/`
        })
        .done(data=>{
            templateComic(data)
        })
        
        
    }
    function templateComic(data){
        koleksi
        for(let i = 0 ; i < data.length;i++ ){
            let template=` <div class="col-4 mb-4">
            <div class="card text-center">
              <img
                src="${data[i].imageUrl}"
                class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].author}</p>
                <button class="btn btn-primary" id="editkomik${i}">Edit</button>
              </div>
            </div>
          </div>`
          koleksi.append(template)
          $(`#editkomik${i}`).on('click',function(){
            // $('#editForm').show()
            console.log('masuk')
            $.ajax({
                type:"GET",
                url:`${server}/${data[i].id}`,
                headers:{token:localStorage.token}
            })
            .done(data=>{
                showEdit(data)
            })
            .fail(err=>{

            })
            // $('#formEdit').on('click',function(){
            //     edit(data)
            // })
        })
        }
        
       
    }
    var editForm = $('#editForm')
    function showEdit(data){
        editForm.find('#titleEdit').val(data.title)
        editForm.find('#authorEdit').val(data.author)
        editForm.find('#urlEdit').val(data.imageUrl)
    }

    function edit(data){
        $.ajax({
            type:"post",
            headers:{token:localStorage.token},
            data:{title:data.title,author:data.author,imageUrl:data.url}
        })
        .done(data=>{
            showComic()
        })
        .fail(err=>{

        })
    }

    $('#formEdit').on('click',function(){
    })

    
    

