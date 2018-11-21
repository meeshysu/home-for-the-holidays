import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers'; // uid
import friendsData from '../../helpers/data/friendsData';
import initializeFriendsPage from '../FriendsPage/friendsPage';

const formBuilder = (friend) => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name:</label>
    <input type="text" class="form-control" value="${friend.name}" id="form-friend-name" placeholder="Indiana Jones">
  </div>
  <div class="form-group">
    <label for="form-friend-address">Address:</label>
    <input type="text" class="form-control" value="${friend.address}" id="form-friend-address" placeholder="1234 Indy Drive">
  </div>
  <div class="form-group">
    <label for="form-friend-email">Email:</label>
    <input type="email" class="form-control" value="${friend.email}" id="form-friend-email" placeholder="savemyartifact@goblet.com">
  </div>
  <div class="form-group">
    <label for="form-friend-phone">Phone Number:</label>
    <input type="text" class="form-control" value="${friend.phoneNumber}" id="form-friend-phone" placeholder="1234567890">
  </div>
  <div class="form-group">
  <label for="form-friend-relationship">Relationship:</label>
  <input type="text" class="form-control" value="${friend.relationship}" id="form-friend-relationship" placeholder="Who are you?">
</div>
  `;
  return form;
};

const gettingFriendFromForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    phoneNumber: $('#form-friend-phone').val(),
    relationship: $('#form-friend-relationship').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  return friend;
};

const buildAddForm = () => {
  const emptyFriend = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    relationship: '',
  };
  let domString = '<h2>Add New Friend</h2>';
  domString += formBuilder(emptyFriend);
  domString += '<button id="add-friend" class="btn btn-success">Save Friend</button>';
  $('#add-edit-friend').html(domString).show();
  $('#friends').hide();
};

const addNewFriend = () => {
  const newFriend = gettingFriendFromForm();
  friendsData.addNewFriend(newFriend)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#friends').show();
      initializeFriendsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};
// Edit
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId; // camel case edit-id
  friendsData.getSingleFriend(idToEdit)
    .then((singleFriend) => {
      let domString = '<h2>Edit Friend</h2>';
      domString += formBuilder(singleFriend);
      domString += `<button id="edit-friend" data-single-edit-id=${singleFriend.id} class="btn btn-success">Save Friend</button>`;
      $('#add-edit-friend').html(domString).show();
      $('#friends').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateFriend = (e) => {
  const updatedFriend = gettingFriendFromForm(); // same work that add did in gathering info
  const friendId = e.target.dataset.singleEditId;
  friendsData.updateFriend(updatedFriend, friendId)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#single-container').html('');
      $('#friends').show();
      initializeFriendsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};


// need an event listener to connect the addNewFriend to the button for the submit form
$('body').on('click', '#add-friend', addNewFriend);
$('body').on('click', '.edit-btn', showEditForm); // putting it on the body
// not waiting to attach the button to it for the event
$('body').on('click', '#edit-friend', updateFriend);

export default buildAddForm;
