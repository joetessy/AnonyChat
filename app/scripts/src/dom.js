import $ from 'jquery';

export function promptForUsername(){
  let username = prompt('Enter a username: ');
  return username.toLowerCase();
}

export class ChatForm {
  constructor(formSel, inputSel){
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }

  init(submitCallback){
    this.$form.submit((event) => {
      event.preventDefault();
      let val = this.$input.val();
      submitCallback(val);
      this.$input.val('');
    });

    this.$form.find('button').on('click', () => this.$form.submit());
  }
}

export class ChatList {
  constructor(listSel, username){
    this.$listSel = $(listSel);
    this.username = username;
  }

  randomImg(){
    return $('<img>', {
      src: 'https://unsplash.it/100/100/?random'
    });
  }

  drawMessage({user: u, timestamp: t, message: m}) {
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });
    if (this.username === u) {
      $messageRow.addClass('me');
    }
    let $message = $('<p>');
    $message.append($('<span>', {
      'class': 'message-username',
      text: u
    }));
    $message.append($('<span>', {
      'class': 'timestamp',
      'data-time': t,
      text: (new Date(t)).getTime()
    }));
    $message.append($('<span>', {
      'class': 'message-message',
      text: m
    }));

    let $img = this.randomImg();

    $messageRow.append($img);
    $messageRow.append($message);
    $('ul').append($messageRow);
    $messageRow.get(0).scrollIntoView();
  }
}
