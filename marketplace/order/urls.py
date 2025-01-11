from django.urls import path

from order.views import AllOrdersListView, OrderItemsListView, CreateOrderView, UpdateOrderStatusView, \
    CompletedOrdersByUserView, NonCompletedOrdersByUserView, CreatePickupPointView, UpdatePickupPointView, \
    DeletePickupPointView, PickupPointListView

urlpatterns = [
    path('', AllOrdersListView.as_view(), name='all-orders'),
    path('<int:order_id>/items/', OrderItemsListView.as_view(), name='order-items'),
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('update/status/<int:pk>/', UpdateOrderStatusView.as_view(), name='update-order-status'),
    path('completed/', CompletedOrdersByUserView.as_view(), name='completed-orders'),
    path('non-completed/', NonCompletedOrdersByUserView.as_view(), name='non-completed-orders'),

    path('pickup-point/', PickupPointListView.as_view(), name='pickup-point'),
    path('pickup-point/create/', CreatePickupPointView.as_view(), name='create-pickup-point'),
    path('pickup-point/update/', UpdatePickupPointView.as_view(), name='update-pickup-point'),
    path('pickup-point/delete/', DeletePickupPointView.as_view(), name='delete-pickup-point'),
]