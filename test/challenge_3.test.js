const {expect} = require('chai');

describe('OOP Tests', () => {
  let user1;
  let user2;
  let mod;
  let admin;
  let user1Comment;
  let user2Comment;
  let modComment;
    
  beforeEach(() => {
    user1 = new User('User 1');
    user2 = new User('User 2');
    mod = new Moderator('Moderator');
    admin = new Admin('Admin');
    user1Comment = new Comment(user1, 'hello');
    user2Comment = new Comment(user2, 'hi', user1Comment);
    modComment = new Comment(mod, 'moderator', user2Comment);
  });
  
  it('should handle instantiation', () => {
    expect(user1.getName()).to.equal('User 1', 'User name is set correctly');
    expect(user2.getName()).to.equal('User 2', 'User name is set correctly');
    expect(user1Comment.getCreatedAt()).to.be.an.instanceof(Date, 'Comment date was set on creation');
    expect(user1Comment.getAuthor()).to.equal(user1, 'User was set on comment creation');
    expect(user2Comment.getAuthor()).to.equal(user2, 'User was set on comment creation');
    expect(modComment.getAuthor()).to.equal(mod, 'User was set on comment creation');
  });
  
  it('should handle login methods', () => {
    expect(user1.isLoggedIn()).to.equal(false, 'User is logged out by default');
    expect(user1.getLastLoggedInAt()).to.equal(null, 'Last logged in date is not set by default');
    user1.logIn();
    expect(user1.isLoggedIn()).to.equal(true, 'User can be logged in');
    expect(user1.getLastLoggedInAt()).to.be.an.instanceof(Date, 'Last logged in date is set');
    let lastLoggedInDate = user1.getLastLoggedInAt();
    user1.logOut();
    expect(user1.isLoggedIn()).to.equal(false, 'User can be logged out');
    expect(user1.getLastLoggedInAt()).to.equal(lastLoggedInDate, 'Last logged in date stays the same');
  });
  
  it('should handle inheritance', () => {
    expect(user1).to.be.an.instanceof(User, 'User is a User');
    expect(user1).to.not.be.an.instanceof(Moderator, 'User is not a Moderator');
    expect(user1).to.not.be.an.instanceof(Admin, 'User is not an Admin');
    
    expect(mod).to.be.an.instanceof(User, 'Moderator is a User');
    expect(mod).to.be.an.instanceof(Moderator, 'Moderator is a Moderator');
    expect(mod).to.not.be.an.instanceof(Admin, 'Moderator is not an Admin');
    
    expect(admin).to.be.an.instanceof(User, 'Admin is a User');
    expect(admin).to.be.an.instanceof(Moderator, 'Admin is a Moderator');
    expect(admin).to.be.an.instanceof(Admin, 'Admin is an Admin');
  });
  
  it('should handle method overriding', () => {
    expect(user1.canEdit(user1Comment)).to.equal(true, 'User can edit their own comment');
    expect(user1.canEdit(user2Comment)).to.equal(false, 'User cannot edit other comments');
    expect(user1.canDelete(user1Comment)).to.equal(false, 'User cannot delete their own comment');
    expect(user1.canDelete(user1Comment)).to.equal(false, 'User cannot delete other comment');

    expect(mod.canEdit(modComment)).to.equal(true, 'Moderator can edit their own comment');
    expect(mod.canEdit(user1Comment)).to.equal(false, 'Moderator cannot edit other comments');
    expect(mod.canDelete(modComment)).to.equal(true, 'Moderator can delete their own comment');
    expect(mod.canDelete(user1Comment)).to.equal(true, 'Moderator can delete other comments');

    expect(admin.canEdit(user1Comment)).to.equal(true, 'Admin can edit other comments');
    expect(admin.canDelete(user1Comment)).to.equal(true, 'Admin can delete other comments');
  });
  
  it('should handle function overloading', () => {
    expect(user1Comment.getRepliedTo()).to.equal(undefined, 'Comment was created without a reply');
    expect(user2Comment.getRepliedTo()).to.equal(user1Comment, 'Comment was created with a reply');
  });
  
  it('should handle User encapsulation', () => {
    expect(user1.getName()).to.equal('User 1', 'User name was set');
    user1.setName('User 1 updated');
    expect(user1.getName()).to.equal('User 1 updated', 'User name can be updated');
    expect(user1.name).to.equal(undefined, 'User name field is not directly exposed');
    expect(user1.loggedIn).to.equal(undefined, 'User loggedIn field is not directly exposed');
  });
  
  it('should handle Comment encapsulation', () => {
    expect(user1Comment.getMessage()).to.equal('hello', 'Comment message was set');
    user1Comment.setMessage('howdy');
    expect(user1Comment.getMessage()).to.equal('howdy', 'Comment message can be updated');
    expect(user1Comment.message).to.equal(undefined, 'Comment message field is not directly exposed');
  });
  
  it('should handle composition', () => {
    expect(user2Comment.getRepliedTo()).to.equal(user1Comment, 'Ensure comment relationships are preserved');
    expect(modComment.getRepliedTo()).to.equal(user2Comment, 'Ensure comment relationships are preserved');
  });
  
  it('should handle toString', () => {
    expect(user1Comment.toString()).to.equal('hello by User 1', 'The toString method should return the correct hierarchy (no reply)');
    expect(user2Comment.toString()).to.equal('hi by User 2 (replied to User 1)', 'The toString method should return the correct hierarchy (reply)');
    expect(modComment.toString()).to.equal('moderator by Moderator (replied to User 2)', 'The toString method should return the correct hierarchy (nested reply)');
    
    user1.setName('User One');
    user2.setName('User Two');
    expect(user1Comment.toString()).to.equal('hello by User One', 'The toString method should reflect reference changes');
    expect(user2Comment.toString()).to.equal('hi by User Two (replied to User One)', 'The toString method should reflect reference changes');
  });
});