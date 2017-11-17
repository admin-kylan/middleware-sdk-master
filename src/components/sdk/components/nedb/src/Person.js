function Person(){

  this.setUsername = function (username){
    this.username = username;
  }

  this.setAge = function(age){
    this.age = age;
  }

  this.setNickName = function(nickName){
    this.nickName = nickName;
  }

  this.getJson = function(){
    return {
      username:this.username,
      age:this.age,
      nickName:this.nickName
    }
  }
}

module.exports = Person;
