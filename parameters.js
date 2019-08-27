const PARAMETERS = {
  "item": [
    {
      "prop": "width | min | max",
      "subs": [
        {
          "prop": "width",
          "values": [
            "auto",
            "50px",
            "100px",
            "200px",
            "50%",
            "100%"
          ]
        },      
        {
          "prop": "min-width",
          "values": [
            "0px",
            "50px",
            "100px",
            "50%",
            "100%"
          ]
        },   
        {
          "prop": "max-width",
          "values": [
            "none",
            "200px",
            "300px",
            "50%",
            "100%"
          ]
        }
      ]
    },
    {
      "prop": "height | min | max",
      "subs": [
        {
          "prop": "height",
          "values": [
            "auto",
            "50px",
            "100px",
            "200px",
            "50%",
            "100%"
          ]
        },    
        {
          "prop": "min-height",
          "values": [
            "0px",
            "50px",
            "100px",
            "50%",
            "100%"
          ]
        },   
        {
          "prop": "max-height",
          "values": [
            "none",
            "200px",
            "300px",
            "50%",
            "100%"
          ]
        }        
      ]
    },               
    {
      "prop": "flex-grow",
      "default": "1",
      "values": [
        "0",
        "1",
        "2",
        "10"
      ]
    },
    {
      "prop": "flex-shrink",
      "values": [
        "0",
        "1",
        "2",
        "10"
      ]
    },
    {
      "prop": "flex-basis",
      "values": [
        "auto",
        "fill",
        "max-content",
        "min-content",
        "fit-content",
        "100px",
        "200px"
      ]
    },
    { 
      "prop": "overlow x | y",
      "subs": [
        {
          "prop": "overflow-x",
          "values": [
            "auto",
            "visible",
            "hidden",
            "clip",
            "scroll"
          ]
        },
        {
          "prop": "overflow-y",
          "values": [
            "auto",
            "visible",
            "hidden",
            "clip",
            "scroll"
          ]
        }
      ]
    },
    {
      "prop": "align-self",
      "values": [
        "auto",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "stretch"
      ]
    },
    {
      "prop": "margin",
      "values": [
        "0",
        "5px",
        "10px",
        "20px"
      ]
    }     
  ],
  "container": [
    {
      "prop": "flex-direction",
      "values": [
        "row",
        "row-reverse",
        "column-reverse",
        "column"
      ]
    },
    {
      "prop": "flex-wrap",
      "default": "wrap",
      "values": [
        "nowrap",
        "wrap-reverse",
        "wrap"
      ]
    },
    {
      "prop": "justify-content",
      "values": [
        "flex-start",
        "space-between",
        "space-around",
        "flex-end",
        "center"
      ]
    },
    {
      "prop": "align-items",
      "values": [
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "baseline"
      ]
    }, 
    {
      "prop": "align-content",
      "values": [
        "stretch",
        "space-between",
        "space-around",
        "flex-start",
        "flex-end",
        "center"
      ]
    },
    { 
      "prop": "overlow x | y",
      "subs": [
        {
          "prop": "overflow-x",
          "values": [
            "auto",
            "visible",
            "hidden",
            "clip",
            "scroll"
          ]
        },
        {
          "prop": "overflow-y",
          "values": [
            "auto",
            "visible",
            "hidden",
            "clip",
            "scroll"
          ]
        }
      ]
    },
    {
      "prop": "padding",
      "values": [
        "0",
        "5px",
        "10px",
        "20px"
      ]
    }     
  ]
}

const DUMMY = 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim. In massa tempor nec feugiat. Nunc aliquet bibendum enim facilisis gravida. Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim. In massa tempor nec feugiat. Nunc aliquet bibendum enim facilisis gravida.'.split('. ')