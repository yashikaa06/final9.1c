import React, { useState } from 'react';
import { Form, Input, TextArea, Button, Header } from 'semantic-ui-react';

const QuestionPost = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    onSubmit({ title, description, tags, type: 'question', date: new Date() });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header as='h4' dividing>What do you want to ask or share</Header>
      <Form.Field>
        <label>Title</label>
        <Input
          placeholder='Start your question with how, what, why, etc.'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Describe your problem</label>
        <TextArea
          placeholder='Describe your problem'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <Input
          placeholder='Add up to 3 tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Field>
      <Button type='submit' color='grey'>Post</Button>
    </Form>
  );
};

export default QuestionPost;
