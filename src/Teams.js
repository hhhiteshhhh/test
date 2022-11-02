import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import {  useNavigate, } from "react-router-dom";

function Teams() {
  // const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  const [completedFiles, setCompletedFiles] = useState(0);
  let user = "anp@pharmaquant.org";
  var array = [
    {
      id: "126",
      project_id: "BC",
      filename: "ACE trial.pdf",
      created_by: "sankalp_ma@srmuniv.edu.in",
      timestamp: "2022-08-03 09:49:34",
    },
    {
      id: "118",
      project_id: "BC",
      filename: "code-example (1).pdf",
      created_by: "anup@pharmaquant.org",
      timestamp: "2022-07-29 12:15:34",
    },
    {
      id: "119",
      project_id: "BC",
      filename: "code-example.pdf",
      created_by: "anup@pharmaquant.org",
      timestamp: "2022-07-29 12:16:34",
    },
    {
      id: "132",
      project_id: "BC",
      filename: "dummy.pdf",
      created_by: "sankalp_ma@srmuniv.edu.in",
      timestamp: "2022-08-11 08:10:55",
    },
    {
      id: "125",
      project_id: "BC",
      filename: "Howell-2022-Fulvestrant-plus-capivasertib-versu.pdf",
      created_by: "sankalp_ma@srmuniv.edu.in",
      timestamp: "2022-08-01 06:59:44",
    },
  ];
  var checkout_data = [
    {
      id: "167",
      project_id: "BC",
      file_id: "118",
      action: "user",
      action_id: "1",
      created_by: "hitesh@pharmaquant.org",
      timestamp: "2022-09-06 05:33:42",
      completed: false,
    },
    {
      id: "165",
      project_id: "BC",
      file_id: "118",
      action: "user",
      action_id: "2",
      created_by: "anup@pharmaquant.org",
      timestamp: "2022-09-06 05:15:32",
      completed: false,
    },
    {
      id: "166",
      project_id: "BC",
      file_id: "119",
      action: "user",
      action_id: "1",
      created_by: "anup@pharmaquant.org",
      timestamp: "2022-09-06 05:16:26",
      completed: false,
    },
    {
      id: "162",
      project_id: "BC",
      file_id: "126",
      action: "user",
      action_id: "1",
      created_by: "anup@pharmaquant.org",
      timestamp: "2022-08-11 06:06:31",
      completed: false,
    },
  ];
  function countFreq(arr, n, field) {
    let temp = [];

    let visited = Array.from({ length: n }, (_, i) => false);

    // Traverse through array elements and
    // count frequencies
    for (let i = 0; i < n; i++) {
      // Skip this element if already processed
      if (visited[i] === true) continue;

      // Count frequency
      let count = 1;
      let checkoutBy = [];
      let completed = [];
      checkoutBy.push(arr[i].created_by);
      completed.push(arr[i].completed);
      for (let j = i + 1; j < n; j++) {
        if (arr[i][field] === arr[j][field]) {
          visited[j] = true;
          count++;
          checkoutBy.push(arr[j].created_by);
          completed.push(arr[j].completed);
        }
      }
      temp.push({
        [field]: arr[i][field],
        count: count,
        checkoutBy: checkoutBy,
        completed: completed,
      });
      // console.log(`${arr[i].file_id} ${count}`);
      // document.write(arr[i] + " " + count + "<br/>");
    }
    return temp;
  }
  const allEqual = (arr, value) => arr.every((v) => v === value);
  const allNotEqual = (arr, value) => arr.every((v) => v !== value);
  useEffect(() => {
    let arr = checkout_data;
    let n = arr.length;
    let completedFilesData = [];
    let incompletedFilesData = [];
    let temp = countFreq(arr, n, "file_id");
    let DoubleEntryCompletedFiles = temp.filter((post) => {
      let allFilesCompleted = allEqual(post.completed, true);
      if (post.count === 2 && allFilesCompleted) {
        return post;
      }
    });
    let DoubleEntryIncompletedFiles = [];
    temp.map((post) => {
      let allFilesIncompleted = allEqual(post.completed, false);
      if (post.count === 2 && allFilesIncompleted) {
        DoubleEntryIncompletedFiles.push(post);
      } else {
        if (post.completed.length === 2) {
          let partiallyIncompleted = allNotEqual(post.completed, false);
          if (!partiallyIncompleted) {
            DoubleEntryIncompletedFiles.push(post);
          }
        }
      }
    });
    let SingleEntryCompletedFiles = temp.filter((post) => {
      let allFilesCompleted = allEqual(post.completed, true);
      if (post.count !== 2 && allFilesCompleted) {
        return post;
      }
    });
    let SingleEntryIncompletedFiles = temp.filter((post) => {
      let allFilesIncompleted = allEqual(post.completed, false);
      if (post.count !== 2 && allFilesIncompleted) {
        return post;
      }
    });

    // console.log(temp);
    // console.log(DoubleEntryCompletedFiles);
    // console.log(DoubleEntryIncompletedFiles);
    // console.log(SingleEntryCompletedFiles);
    // console.log(SingleEntryIncompletedFiles);

    checkout_data.map((checkoutFile) => {
      SingleEntryIncompletedFiles.map((doubleCheckedOutFile) => {
        if (
          doubleCheckedOutFile.checkoutBy.includes(user) &&
          doubleCheckedOutFile.file_id === checkoutFile.file_id &&
          checkoutFile.completed === false &&
          checkoutFile.created_by === user
        ) {
          incompletedFilesData.push({
            ...checkoutFile,
            created_by: doubleCheckedOutFile.checkoutBy,
          });
        } else {
          if (
            !doubleCheckedOutFile.checkoutBy.includes(user) &&
            doubleCheckedOutFile.file_id === checkoutFile.file_id
          ) {
            var found = false;
            for (var i = 0; i < completedFilesData.length; i++) {
              if (completedFilesData[i].file_id === checkoutFile.file_id) {
                found = true;
                break;
              }
            }
            if (!found) {
              incompletedFilesData.push({
                ...checkoutFile,
                created_by: doubleCheckedOutFile.checkoutBy,
              });
            }
          }
        }
      });
    });

    checkout_data.map((checkoutFile) => {
      DoubleEntryIncompletedFiles.map((doubleCheckedOutFile) => {
        if (
          doubleCheckedOutFile.checkoutBy.includes(user) &&
          doubleCheckedOutFile.file_id === checkoutFile.file_id &&
          checkoutFile.completed === false &&
          checkoutFile.created_by === user
        ) {
          incompletedFilesData.push({
            ...checkoutFile,
            created_by: doubleCheckedOutFile.checkoutBy,
          });
        } else {
          if (
            doubleCheckedOutFile.checkoutBy.includes(user) &&
            doubleCheckedOutFile.file_id === checkoutFile.file_id &&
            checkoutFile.completed === true &&
            checkoutFile.created_by === user
          ) {
            completedFilesData.push({
              ...checkoutFile,
              created_by: doubleCheckedOutFile.checkoutBy,
            });
          } else {
            if (
              !doubleCheckedOutFile.checkoutBy.includes(user) &&
              doubleCheckedOutFile.file_id === checkoutFile.file_id
            ) {
              var found = false;
              for (var i = 0; i < completedFilesData.length; i++) {
                if (completedFilesData[i].file_id === checkoutFile.file_id) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                completedFilesData.push({
                  ...checkoutFile,
                  created_by: doubleCheckedOutFile.checkoutBy,
                });
              }
            }
          }
        }
      });
    });

    checkout_data.map((checkoutFile) => {
      SingleEntryCompletedFiles.map((doubleCheckedOutFile) => {
        if (
          doubleCheckedOutFile.checkoutBy.includes(user) &&
          doubleCheckedOutFile.file_id === checkoutFile.file_id &&
          checkoutFile.completed === true &&
          checkoutFile.created_by === user
        ) {
          completedFilesData.push({
            ...checkoutFile,
            created_by: doubleCheckedOutFile.checkoutBy,
          });
        } else {
          if (
            !doubleCheckedOutFile.checkoutBy.includes(user) &&
            doubleCheckedOutFile.file_id === checkoutFile.file_id
          ) {
            var found = false;
            for (var i = 0; i < completedFilesData.length; i++) {
              if (completedFilesData[i].file_id === checkoutFile.file_id) {
                found = true;
                break;
              }
            }

            if (!found) {
              incompletedFilesData.push({
                ...checkoutFile,
                created_by: doubleCheckedOutFile.checkoutBy,
              });
            }
          }
        }
      });
    });

    checkout_data.map((checkoutFile) => {
      DoubleEntryCompletedFiles.map((doubleCheckedOutFile) => {
        if (
          doubleCheckedOutFile.checkoutBy.includes(user) &&
          doubleCheckedOutFile.file_id === checkoutFile.file_id &&
          checkoutFile.completed === true &&
          checkoutFile.created_by === user
        ) {
          completedFilesData.push({
            ...checkoutFile,
            created_by: doubleCheckedOutFile.checkoutBy,
          });
        } else {
          if (
            !doubleCheckedOutFile.checkoutBy.includes(user) &&
            doubleCheckedOutFile.file_id === checkoutFile.file_id
          ) {
            var found = false;
            for (var i = 0; i < completedFilesData.length; i++) {
              if (completedFilesData[i].file_id === checkoutFile.file_id) {
                found = true;
                break;
              }
            }

            if (!found) {
              completedFilesData.push({
                ...checkoutFile,
                created_by: doubleCheckedOutFile.checkoutBy,
              });
            }
          }
        }
      });
    });

    // console.log(completedFilesData);
    // console.log(incompletedFilesData);

    let sortedIncompletedFiles = [];

    incompletedFilesData.map((file) => {
      if (file.created_by.includes(user)) {
        sortedIncompletedFiles.push(file);
      }
    });
    incompletedFilesData.map((file) => {
      if (!file.created_by.includes(user)) {
        sortedIncompletedFiles.push(file);
      }
    });

    // console.log(sortedIncompletedFiles);

    let completedFilesActualData = [];
    let incompletedFilesActualData = [];

    sortedIncompletedFiles.map((pfile, index) => {
      array.map((file, indexww) => {
        if (file.id === pfile.file_id) {
          incompletedFilesActualData.splice(index, 0, file);
          // console.log(index);
        }
        return null;
      });
      return null;
    });

    // console.log(completedFilesData);
    // console.log(array);
    //
    array.map((file, index) => {
      completedFilesData.map((pfile) => {
        if (file.id === pfile.file_id) {
          completedFilesActualData.push(file);
        }
        return null;
      });
      return null;
    });

    array.map((file, index) => {
      completedFilesData.map((pfile) => {
        if (file.id === pfile.file_id) {
          array.splice(index, 1);
        }
        return null;
      });
      return null;
    });

    array.map((file, index) => {
      sortedIncompletedFiles.map((pfile) => {
        if (file.id === pfile.file_id) {
          array.splice(index, 1);
        }
        return null;
      });
      return null;
    });
    // console.log(incompletedFilesActualData, array, completedFilesActualData);
    let temp12 = new Set([
      ...incompletedFilesActualData,
      ...array,
      ...completedFilesActualData,
    ]);
    console.log(temp12);

    let temp13 = [];
    let temp15 = [...temp12];
    temp13 = temp15.splice(0, 4);
    // console.log(temp15);
    // console.log(temp13);
    setFiles([...temp12]);
  }, []);

  console.log(files);
  const handleClick = (e, index, file) => {
    if (index <= 2) {
      console.log("priority file selected");
    } else {
      if (files.length - completedFiles <= index) {
        console.log("file already completed");
      } else {
        console.log("please complete priority file first!!!");
      }
    }
  };
  return (
    <div>
      {files?.map((file, index) => {
        return (
          <div
            key={file.id}
            onClick={(e) => {
              handleClick(e, index, file);
            }}
          >
            {file.id} file number
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}

export default Teams;
