function setupDB(){
    const dbName = "the_name";
    const request = indexedDB.open(dbName, 1);
    request.onerror = (event) => {
      // Handle errors.
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // Create an objectStore to hold information about our customers. We're
      // going to use "ssn" as our key path because it's guaranteed to be
      // unique - or at least that's what I was told during the kickoff meeting.
      const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

    };
    
}