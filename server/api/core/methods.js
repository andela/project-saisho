import { Meteor } from 'meteor/meteor'

Meteor.methods({
  createAUser : function(options){
    check(options, Match.Any);
    console.log('Calling method from meteor methods', options);
    return Accounts.createUser(options);
  }
});
