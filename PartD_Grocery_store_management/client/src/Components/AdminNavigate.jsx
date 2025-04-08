import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const AdminNavigate = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);

    const handleView = () => {
        setVisible(false);
        navigate('/admin/view/orders'); 
    }
    const handleCreate = () => {
        setVisible(false);
        navigate('/admin/home'); 
    };

    return (
        <div style={{ paddingTop: '60px' }}>     
        <Dialog
            visible={visible}
            style={{ width: '50vw' }}
            onHide={() => setVisible(false)}
            closable={false}
            modal           
        >
            <h3>To view existing orders, press "View".<br />To create a new order, press "Create".</h3>
            <div className="flex justify-content-end gap-2 mt-4">
                <Button label="View" icon="pi pi-eye" onClick={handleView} className="p-button-secondary" />
                <Button label="Create" icon="pi pi-plus" onClick={handleCreate} className="p-button-primary" />
            </div>
        </Dialog>
        </div>
    );
};

export default AdminNavigate;