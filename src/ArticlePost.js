import React, { useState } from 'react';
import { Form, Input, TextArea, Button, Header } from 'semantic-ui-react';
import { storage } from './utils/firebase'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ArticlePost = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    return getDownloadURL(imageRef);
  };

  const handleSubmit = async () => {
    let imageUrl = '';
    if (image) {
      imageUrl = await handleImageUpload();
    }
    onSubmit({ title, abstract, content, tags, imageUrl, type: 'article', date: new Date() });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header as='h4' dividing>What do you want to ask or share</Header>
      <Form.Field>
        <label>Title</label>
        <Input
          placeholder='Enter a descriptive title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Abstract</label>
        <TextArea
          placeholder='Enter a 1-paragraph abstract'
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Article Text</label>
        <TextArea
          placeholder='Enter the article content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
      <Form.Field>
        <label>Upload Image</label>
        <Input
          type='file'
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Field>
      <Button type='submit' color='grey'>Post</Button>
    </Form>
  );
};

export default ArticlePost;
