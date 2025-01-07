from django.urls import path

from product.views import ProductListView, CreateProductView, UpdateProductView, DeleteProductView, CategoryListView, \
    CreateCategoryView, DeleteCategoryView, SubCategoryListView, CreateSubCategoryView, DeleteSubCategoryView, \
    ProductDetailView

urlpatterns = [
    path('', CategoryListView.as_view(), name='category-list'),
    path('create/', CreateCategoryView.as_view(), name='create-cagegory'),
    path('delete/', DeleteCategoryView.as_view(), name='delete-cagegory'),

    path('subcategories/', SubCategoryListView.as_view(), name='subcategory-list'),
    path('subcategories/create/', CreateSubCategoryView.as_view(), name='create-subcategory'),
    path('subcategories/delete/', DeleteSubCategoryView.as_view(), name='delete-subcategory'),

    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/create/', CreateProductView.as_view(), name='product-create'),
    path('products/update/', UpdateProductView.as_view(), name='product-update'),
    path('products/delete/', DeleteProductView.as_view(), name='product-delete'),
]