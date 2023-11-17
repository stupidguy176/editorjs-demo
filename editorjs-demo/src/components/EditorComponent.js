import React, {useEffect, useRef} from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';

const DEFAULT_INITIAL_DATA = {
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "This is my awesome editor!",
        "level": 1
      }
    },
    {
      id: "7RosVX2kcH",
      type: "paragraph",
      data: {
        text: "Given data can be used as you want: render with HTML for Web clients, render natively for mobile apps, create the markup for Facebook Instant Articles or Google AMP, generate an audio version, and so on."
      }
    },
    {
      id: "eq06PsNsab",
      type: "paragraph",
      data: {
        text: "Clean data is useful to sanitize, validate and process on the backend."
      }
    },
    {
      id: "M3UXyblhAo",
      type: "header",
      data: {
        text: "What does it mean clean data output?",
        level: 3
      }
    }
  ]
}

const EditorComponent = () => {
  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      tools: {
        header: Header
      }
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <>
    <div id="editorjs"></div>
  </>;
}

export default EditorComponent;