<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\NotificationModel;

class Notification extends BaseController
{
    public function index()
    {
        $notificationModel = new NotificationModel();
        
        $notifications = $notificationModel->where('user_id', session()->get('id'))
                                           ->orderBy('created_at', 'DESC')
                                           ->findAll(20);

        return $this->response->setJSON($notifications);
    }

    public function markAllAsRead()
    {
        $notificationModel = new NotificationModel();
        
        $notificationModel->where('user_id', session()->get('id'))
                          ->where('is_read', false)
                          ->set(['is_read' => true])
                          ->update();

        return $this->response->setJSON(['status' => 'success']);
    }

    public function markAsRead($id)
    {
        $notificationModel = new NotificationModel();
        
        $notificationModel->where('id', $id)
                          ->where('user_id', session()->get('id'))
                          ->set(['is_read' => true])
                          ->update();

        return $this->response->setJSON(['status' => 'success']);
    }
}
