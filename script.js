var arr_of_obj = new Set();
var value_id;
var title_flag = false;
var subtask = new Map;

function modal(){
    document.getElementById("div1").style.display = "block";
    document.getElementById("h1").style.filter="blur(5px)";
};

function addCard(){
    var card_title = document.getElementById("modal-input-box").value;
    createObj(card_title);
    closeModal();
}


function closeModal(){
    document.getElementById("div1").style.display = "none";
    document.getElementById("h1").style.filter="blur(0px)"
}


function createObj(title){
    document.getElementById('list').style.display = 'none'
    var card_obj = {
        title: title,
        id: Date.now(),
        subtask
    };
    arr_of_obj.add(card_obj);
    createCard(card_obj.id);
};


function addList(){
    var cloned_list_item = document.querySelector(".tle").cloneNode(true);
    var card_item = document.getElementById('modal-input-box-card').value;
    console.log(value_id);
    cloned_list_item.innerText =  card_item; 
    cloned_list_item.style.display = "block";
    cloned_list_item.setAttribute('id',`${Date.now()}`);
    cloned_list_item.setAttribute('value',`${Date.now()}`);
    cloned_list_item.setAttribute('style',"margin-left: 10px;");
    var done_button = document.createElement('button');
    done_button.setAttribute('id',`cheking-${Date.now()}`);
    done_button.setAttribute('class','done is marked');
    done_button.setAttribute('value',`${Date.now()}`);
    done_button.setAttribute('onclick','completedTask(this.value)');
    done_button.innerText = ' Mark Done';
    done_button.setAttribute('style','font-size:15 px;cursor:pointer; height:18px; border-radius:10px;')
    cloned_list_item.appendChild(done_button);
    cloned_list_item.setAttribute('onClick',"completedTask(this.value)");
     for(obj of arr_of_obj){
        for(prop in obj){
            if(obj.id == value_id){
                obj.subtask.set(`${card_item}`,`${Date.now()}`);
                break;
            }
        }
    }
    document.getElementById(`${value_id}`).getElementsByClassName('add-list-after-this')[0].appendChild(cloned_list_item).appendChild(done_button);
    closeCardModal();
}

function closeCardModal(){
    document.getElementById('dcm').style.display = "none";
}

function addSubtask(val) {
    document.getElementById("dcm").style.display = "block";
    value_id = val;
};


function deleteCard(val){
    var delete_div = document.getElementById(`${val}`);
    for(obj of arr_of_obj){
        for(prop in obj){
        if (obj.id==val)
        arr_of_obj.delete(obj);
        break;
        }
    }
    delete_div.parentNode.removeChild(delete_div);
    if(arr_of_obj.size==0){
        document.getElementById('list').style.display = 'block';
    }
    
};

function createCard(){
    var first_card = document.querySelector('.card').cloneNode(true);
    display(first_card);
};


function completedTask(value){
    document.getElementById(`${value}`).style.textDecoration = 'line-through';
    document.getElementById(`${value}`).style.color = '#112D4E';
    document.getElementById(`cheking-${value}`).remove();
}

function display(card){
    document.getElementById('list').style.display = 'none'
    arr_of_obj.forEach(element => {
        card.id = element.id;
        card.querySelector(".card-head").innerHTML = element.title;
        card.querySelector(".card-head").setAttribute('value',`${element.id}`);
        card.setAttribute("value",`${element.id}`);
        card.setAttribute("display","block");
        card.setAttribute("min-height","300px");
        card.querySelector(".dbc").setAttribute("value",`${element.id}`);
        card.querySelector(".dbc").setAttribute("onClick","deleteCard(this.value)");
        card.querySelector(".buttcard").setAttribute("value",`${element.id}`);
        card.querySelector(".buttcard").setAttribute("onClick","addSubtask(this.value)");    
    });
    if(title_flag)
    card.style.display = 'none';
    else
    card.style.display = "block";
    document.getElementById("maincontainer").appendChild(card);
}

function headerFunc(val){
    var card_header;
    for(let ele of arr_of_obj){
        for(let id in ele){
            if(ele[id]==val){
                card_header = ele.title;
                break;
            };
        };
    };
    document.querySelector("#name").style.display = 'none';
    document.querySelector("#add-button-text").style.display = 'none';
    for(let ele of arr_of_obj){
            if(ele.id==val){
                document.getElementById(`${ele.id}`).style.display = 'block';
            }
            else {
                document.getElementById(`${ele.id}`).style.display = 'none';
            }
    };
    document.getElementById('dyh1').innerText = `${card_header}`;
    document.getElementById('dyh1').style.display = 'flex'
    document.getElementById('maincontainer').style.justifyContent = 'center'
    document.getElementById('back-button').style.display = 'block'
    title_flag = true;
};


function displayAll(){
    title_flag = false;
    document.querySelector("#name").style.display = 'block';
    document.querySelector("#add-button-text").style.display = 'inline-block';
    document.getElementById('back-button').style.display = 'none';
    for(let ele of arr_of_obj){
            document.getElementById(`${ele.id}`).style.display = 'block';
    };
    document.getElementById('dyh1').innerText = ``;
    document.getElementById('dyh1').style.display = 'none';
}