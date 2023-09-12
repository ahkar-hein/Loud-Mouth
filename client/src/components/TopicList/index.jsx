// import React from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const TopicList = () => {
//   const [selectedTopic, setSelectedTopic] = React.useState('1'); // Set the initial selected topic

//   const handleChange = (event) => {
//     setSelectedTopic(event.target.value);
//     // add logic here to filter thoughts based on the selected topic
//   };

//   return (
//     <div className="topic-list">
//       <FormControl variant="outlined" style={{ minWidth: 200 }}>
//         <InputLabel id="topic-label">Select a Topic</InputLabel>
//         <Select
//           labelId="topic-label"
//           id="topic-select"
//           label="Select a Topic"
//           style={{ fontSize: '16px' }}
//           value={selectedTopic} // Set the value to the selectedTopic state
//           onChange={handleChange} // Handle changes in the selected topic
//         >
//           <MenuItem value="1">Sports</MenuItem>
//           <MenuItem value="2">Politics</MenuItem>
//           <MenuItem value="3">Food</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default TopicList;
