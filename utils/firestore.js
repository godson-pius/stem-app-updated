import {collection, doc, getDocs, onSnapshot, or, orderBy, query, setDoc, updateDoc, where, addDoc, serverTimestamp} from "@firebase/firestore";
import {db} from "../FirebaseConfig";

export const loginUser = async (user) => {
    try {
        const usersRef = collection(db, "users"); // Reference to the 'users' collection
        const q = query(usersRef,
            where("role", "==", "student"),
            where("email", "==", user.email),
            where("password", "==", user.password)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data(); // Assuming only one admin with this email
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

// Check if a username exists
const usernameExists = async (username) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
};

// Check if an email exists
const emailExists = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
};

// Suggest a unique username if needed
const suggestUniqueUsername = async (baseUsername) => {
    let newUsername = baseUsername;
    let attempt = 0;

    while (await usernameExists(newUsername)) {
        attempt++;
        const randomNum = Math.floor(Math.random() * 1000);
        newUsername = `${baseUsername}${randomNum}`;

        // Safety check to avoid infinite loops
        if (attempt > 10) break;
    }

    return newUsername;
};

// Add user to DB, checking username and email
export const addUserToDb = async (data) => {
    try {
        const usersRef = collection(db, "users");

        const [usernameTaken, emailTaken] = await Promise.all([
            usernameExists(data.username),
            emailExists(data.email),
        ]);

        if (usernameTaken && emailTaken) {
            const suggestedUsername = await suggestUniqueUsername(data.username);
            return {
                success: false,
                message: `Account exists.`,
            };
        }

        if (usernameTaken) {
            const suggestedUsername = await suggestUniqueUsername(data.username);
            return {
                success: false,
                message: `Username already exists. Please choose another or use the suggested username: (${suggestedUsername})`
            };
        }

        if (emailTaken) {
            return {
                success: false,
                message: `Email already exists.`,
            };
        }

        // Add user if both are unique
        await addDoc(usersRef, {
            ...data,
            createdAt: serverTimestamp(),
        });

        return {
            success: true,
            message: `User added successfully.`,
        };

    } catch (error) {
        console.error("Error adding user:", error.message);
        return {
            success: false,
            message: error.message,
        };
    }
};

export const getUserDetails = async () => {
    try {
        const usersRef = collection(db, "users"); // Reference to the 'users' collection
        const q = query(usersRef, where("email", "==", sessionStorage.getItem('user-email'))); // Query for a user by email
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No user found with this email.");
            return null;
        }

        const userData = querySnapshot.docs[0].data();
        return { id: querySnapshot.docs[0].id, ...userData };
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return null;
    }
};

export const updateUserInDb = async (uid, updatedData) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, updatedData);
        return true;
    } catch (error) {
        console.error("Error updating user data:", error.message);
        return false;
    }
}

export const getAllCourse = async (course) => {
    try {
        const courseRef = collection(db, "courses"); // Reference to the 'courses' collection
        const q = query(courseRef,
            where("classname", "==", course.classname),
            // orderBy("createdAt", "asc") // Ascending order by createdAt
        ); // Query for courses
        const querySnapshot = await getDocs(q);

        const courses = [];
        querySnapshot.forEach((doc) => {
            courses.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });
        return courses;
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        return [];
    }
}

export const getAllTopicsForACourse = async (course) => {
    try {
        const topicRef = collection(db, "topics"); // Reference to the 'topics' collection
        const q = query(topicRef,
            where("classname", "==", course.classname),
            where("course", "==", course.name),
            orderBy("createdAt", "asc") // Ascending order by createdAt
        ); // Query for topics with course === specified course
        const querySnapshot = await getDocs(q);

        const topics = [];
        querySnapshot.forEach((doc) => {
            topics.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });
        return topics;
    } catch (error) {
        console.error("Error fetching topics:", error.message);
        return [];
    }
}

export const getAllUploadsForACourse = async (data) => {
    try {
        const topicRef = collection(db, "uploads"); // Reference to the 'uploads' collection
        const q = query(topicRef,
            where("course", "==", data.course),
            where("classname", "==", data.classname),
            where("topic", "==", data.topic),
            orderBy("createdAt", "asc") // Ascending order by createdAt
        ); // Query for topics with course === specified course
        const querySnapshot = await getDocs(q);

        const uploads = [];
        querySnapshot.forEach((doc) => {
            uploads.push({ id: doc.id, ...doc.data() }); // Push the document data into the array
        });

        return uploads;
    } catch (error) {
        console.error("Error fetching uploads:", error.message);
        return [];
    }
}

export const sendMessage = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "studentChats"), {
            ...data,
            createdAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error adding chat ID:", error.message);
        return false;
    }
}

export const getGeneralChat = (setChats) => {
    try {
        const chatRef = collection(db, "studentChats");

        const q = query(
            chatRef,
            where("received", "==", "general"),
            orderBy("createdAt", "asc")
        );

        // Real-time listener
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedChats = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setChats(updatedChats); // Update state
        });

        return unsubscribe; // Cleanup function for unmounting
    } catch (error) {
        console.error("Error fetching chats:", error.message);
        return () => {};
    }
};
