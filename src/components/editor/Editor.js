import React from 'react';
import PropTypes from 'prop-types';

import Form from '@/components/form/Form';

const Editor = ({
  canDelete,
  children = [],
  fields = [],
  title = '',
  type = '',
  initialValues,
  formName = '',
  onDelete,
}) => (
  <section className={`editor editor--${type}`}>
    <h1 className='editor__title'>{title}</h1>
    <Form form={formName} initialValues={initialValues} fields={fields} key={formName}>{/* Do not remove the key! */}
      {canDelete && <button type='button' onClick={onDelete} className='button'>Delete</button>}
    </Form>
    {children}
  </section>
);

Editor.propTypes = {
  canDelete: PropTypes.bool,
  children: PropTypes.array,
  fields: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  initialValues: PropTypes.object,
  formName: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Editor;
