// PostList.js
import React, { useEffect, useState } from 'react';
import { createPost, deletePost, getAllPosts } from './allAPIS';
import './Post.css'
import { Modal } from 'react-bootstrap';


const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newNum, setNum] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Clear the input field when the modal is closed
        setNewPostTitle('');
        setNewEmail('');
        setNum('');
    };

    const handleAddPost = async () => {
        try {
            const response = await createPost({ title: newPostTitle, email: newEmail, pnum: newNum });
            // Update the state with the new post
            setPosts([...posts, response]);
            closeModal(); // Close the modal after adding the post
        } catch (error) {
            console.error('Error adding post: ', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePost(id);
            // Remove the deleted post from the state
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            console.error('Error deleting post: ', error);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getAllPosts();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <>

            <div className='post'>
                <div className='table  borded shadow '>
                    <ul class="responsive-table">
                        <li class="table-header ">
                            <div class="col col-1">#</div>
                            <div class="col col-2"> Name</div>
                            <div class="col col-3">Phone Number</div>
                            <div class="col col-4">E-Mail</div>
                            <div class="col col-5"> <button onClick={openModal} className='btn btn-success '>ADD <i className="fa-bounce fa-solid fa-plus"></i></button></div>
                        </li>
                        {posts.map((post) => (
                            <li class="table-row">
                                <div class="col col-1" data-label="Job Id">{post.id}</div>
                                <div class="col col-2" data-label="Customer Name">{post.title}</div>
                                <div class="col col-3" data-label="Customer Name">{post.pnum}</div>
                                <div class="col col-4" data-label="Amount">{post.email}</div>
                                <div class="col col-5" data-label="Payment Status"> <i onClick={() => { handleDelete(post?.id) }} style={{ color: 'red' }} className="fa-solid fa-trash-can "></i>
                                </div>
                            </li>
                        ))}
                    </ul>


                </div>
            </div>
            <div className='mainmodal'>
               <div >
                    <Modal className='text-center modals'
                                show={isModalOpen}
                                onHide={closeModal}
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title className='mhead'>Add New User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h7 className='h5'>Enter Name : </h7>
                                    <input className='inputs'
                                        type="text"
                                        placeholder="Enter Name..."
                                        value={newPostTitle}
                                        onChange={(e) => setNewPostTitle(e.target.value)}
                                    />
                                    <h7 className='h5'>Enter Phone Number : </h7>
                                    <input className='inputs'
                                        type="text"
                                        placeholder="Enter Phone Number..."
                                        value={newNum} onChange={(e) => setNum(e.target.value)}
                                    />
                                    <h7 className='h5'>Enter E-Mail : </h7>
                                    <input className='inputs'
                                        type="text"
                                        placeholder="Enter Mail Id..."
                                        value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className='btn1' variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button className='btn2' variant="primary" onClick={handleAddPost}>
                                        Add 
                                    </button>
                                </Modal.Footer>
                            </Modal>
                            
               </div>
            </div>


        </>
    );
};

export default PostList;
