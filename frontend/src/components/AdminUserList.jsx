import React, { useState } from 'react';

const AdminUserList = ({ users, onPasswordChange, onDelete, onToggleActive }) => {
    const [editId,    setEditId]    = useState(null);
    const [newPass,   setNewPass]   = useState('');

    if (users.length === 0) {
        return <p>No users found!</p>;
    }

    return (
        <div>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.thead}>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} style={styles.row}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    background: user.is_staff ? '#1890ff' : '#52c41a'
                                }}>
                                    {user.is_staff ? '👑 Admin' : '👤 Employee'}
                                </span>
                            </td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    background: user.is_active ? '#52c41a' : '#ff4d4f'
                                }}>
                                    {user.is_active ? '✅ Active' : '❌ Inactive'}
                                </span>
                            </td>
                            <td>
                                {/* Password Change */}
                                {editId === user.id ? (
                                    <div style={styles.passEdit}>
                                        <input
                                            style={styles.passInput}
                                            type="password"
                                            placeholder="New password"
                                            onChange={(e) => setNewPass(e.target.value)}
                                        />
                                        <button
                                            style={styles.saveBtn}
                                            onClick={() => {
                                                onPasswordChange(user.id, newPass);
                                                setEditId(null);
                                            }}
                                        >
                                            Save
                                        </button>
                                        <button
                                            style={styles.cancelBtn}
                                            onClick={() => setEditId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div style={styles.actions}>
                                        <button
                                            style={styles.editBtn}
                                            onClick={() => setEditId(user.id)}
                                        >
                                            🔑 Password
                                        </button>
                                        <button
                                            style={{
                                                ...styles.toggleBtn,
                                                background: user.is_active ? '#ff4d4f' : '#52c41a'
                                            }}
                                            onClick={() => onToggleActive(user.id, user.is_active)}
                                        >
                                            {user.is_active ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button
                                            style={styles.deleteBtn}
                                            onClick={() => onDelete(user.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    table     : { width:'100%', borderCollapse:'collapse' },
    thead     : { background:'#1890ff', color:'white' },
    row       : { borderBottom:'1px solid #ddd', textAlign:'center' },
    badge     : { padding:'4px 10px', borderRadius:'20px', color:'white', fontSize:'12px' },
    actions   : { display:'flex', gap:'5px', justifyContent:'center' },
    editBtn   : { padding:'4px 8px', background:'#1890ff', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'12px' },
    toggleBtn : { padding:'4px 8px', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'12px' },
    deleteBtn : { padding:'4px 8px', background:'#ff4d4f', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'12px' },
    passEdit  : { display:'flex', gap:'5px', alignItems:'center' },
    passInput : { padding:'4px 8px', border:'1px solid #ddd', borderRadius:'4px', fontSize:'12px', width:'120px' },
    saveBtn   : { padding:'4px 8px', background:'#52c41a', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'12px' },
    cancelBtn : { padding:'4px 8px', background:'#999', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'12px' },
};

export default AdminUserList;