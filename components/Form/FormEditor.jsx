import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const FormEditor = ({ field }) => {
  const editorRef = useRef(null);
  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue=""
        onBlur={field.onBlur}
        onEditorChange={(content) => field.onChange(content)}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "codesample",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
          ],
          toolbar:
            "undo redo | blocks | " +
            "codesample |bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
          skin: "oxide-dark",
        }}
      />
    </>
  );
};

export default FormEditor;
