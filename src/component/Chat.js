import React, {useEffect, useState} from 'react';
import { Flex, Input } from 'chakra-ui';
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
    const addMessages = (data) => {
      setMessages(m =>
        m
          .concat(data)
          .sort((a, b) =>
            new Date(a.date_created).getTime() > new Date(b.date_created).getTime() ? -1 : 1)
      );
    };
    async function onMount() {
      await loadPublicMessages(publicMessages, profile, addMessages);
    }
    onMount();
  }, []);

  return (
    <Flex flexDirection='column' maxWidth={800} style={{ margin: '0 auto' }}>
      <Flex>
        <Input
          placeholder='Chirp, chirp to #public!'
          borderColor='blue.300'
          size='lg'
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
        minHeight={200}
        width='100%'
        bg='gray.50'
        mt={2}
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

const ChatHoC = ({ publicMessages, profile, shouldDisplay }) =>
  shouldDisplay ?
    <Chat publicMessages={publicMessages} profile={profile} /> :
    <React.Fragment />;

export default ChatHoC;
