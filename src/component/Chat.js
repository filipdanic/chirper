import React, {useEffect, useState} from 'react';
import {Flex, Input, Text} from 'chakra-ui';
import uuidv4 from 'uuidv4';
import mkdirp from '../utils/mkdirp';
import loadPublicMessages from '../utils/loadPublicMessages';
import Message from './Message';

const onSubmit = async (text, publicMessages) => {
  await mkdirp('/messages', publicMessages);
  const id = uuidv4();
  const now = Date.now();
  const message = {
    channel: 'public',
    text,
    date_created: now,
    date_modified: now
  };
  await publicMessages.writeFile(
    `messages/${id}.json`,
    JSON.stringify(message, null, 2)
  );
};

const Chat = ({ publicMessages, profile }) => {
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);
  useEffect(() => {
    async function onMount() {
      await loadPublicMessages(publicMessages, profile, setMessages);
    }
    onMount();
  }, []);

  console.log(messages);
  return (
    <Flex flexDirection='column' maxWidth={800} style={{ margin: '0 auto' }}>
      <Flex>
        <Input
          placeholder="Chirp chirp to #public"
          borderColor='blue.200'
          size="lg"
          onChange={e => setMessage(e.target.value)}
          value={message}
          onKeyPress={async event => {
            if (event.key === 'Enter') {
              await onSubmit(message, publicMessages);
              setMessage('');
            }
          }}
        />
      </Flex>
      <Flex
        height={600}
        width='100%'
        bg='gray.50'
        mb={2}
        flexDirection='column'
      >
        {(messages || []).map(message =>
          <Message
            key={`${message.date_created}::${message.dat_archive}`}
            {...message}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Chat;
