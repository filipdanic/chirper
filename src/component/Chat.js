import React, {useState} from 'react';
import { Flex, Input } from 'chakra-ui';
import uuidv4 from 'uuidv4';
import mkdirp from '../utils/mkdirp';

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


const Chat = ({ publicMessages }) => {
  const [ message, setMessage ] = useState('');
  return (
    <Flex flexDirection='column' maxWidth={800}>
      <Flex height={600} width='100%' bg='gray.50' mb={2}>
      </Flex>
      <Flex>
        <Input
          placeholder="Message #public"
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
    </Flex>
  );
};

export default Chat;
