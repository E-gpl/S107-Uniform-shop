document.addEventListener('DOMContentLoaded', function () {
    console.log('Main.js loaded and ready!');
 
 
    // 注册表单处理
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();
           
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const email = document.getElementById('email').value.trim();
           
            if (!username || !password || !email) {
                alert('All fields are required.');
                return;
            }
           
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, email })
                });
               
                const data = await response.json();
                console.log('Register response:', data);
               
                if (data.success) {
                    alert('Registration successful! Redirecting to login...');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message || 'Registration failed.');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred. Please try again.');
            }
        });
 
 
        // 清除注册表单数据
        registerForm.addEventListener('reset', function() {
            setTimeout(() => {
                registerForm.querySelectorAll('input').forEach(input => input.value = '');
            }, 100);
        });
    }
 
 
    // 登录表单处理
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
           
            const username = document.getElementById('username');
            const password = document.getElementById('password');
           
            if (!username.value.trim() || !password.value.trim()) {
                alert('Please fill in all fields');
                return;
            }
           
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username.value, password: password.value })
                });
               
                const data = await response.json();
               
                if (data.success) {
                    alert('Login successful!');
                    handleLoginSuccess();
                } else {
                    alert(data.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
            }
           
            // 登录请求完成后清空输入框
            username.value = '';
            password.value = '';
        });
    }
 
 
    // 服务器连接检查
    fetch('http://localhost:3000').catch(error => {
        console.error('Server connection error:', error);
    });
 
 
    // 页面加载时清除所有输入框的值
    window.addEventListener('load', function() {
        document.querySelectorAll('form').forEach(form => {
            form.reset();
            form.querySelectorAll('input').forEach(input => input.value = '');
        });
    });
 
 
 
 
 
 
 
 
 
 
   
 // 在现有代码后添加
 document.addEventListener('DOMContentLoaded', function() {
    const userProfile = document.querySelector('.user-profile');
    const dropdownMenu = document.querySelector('.dropdown-menu');
 
 
    // 处理登出功能
    const logoutLink = document.querySelector('.dropdown-menu a[href="#logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            // 执行登出操作
            localStorage.removeItem('userToken');
            window.location.href = 'login.html';
        });
    }
 
 
    // 检查用户是否登录
    function checkLoginStatus() {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            // 如果未登录，点击个人图标跳转到登录页面
            userProfile.addEventListener('click', function(e) {
                if (!userToken) {
                    e.preventDefault();
                    window.location.href = 'login.html';
                }
            });
        }
    }
 
 
    checkLoginStatus();
 });
 // 在现有代码中添加或更新以下部分
 // 添加用户菜单的处理代码
 document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM加载完成，初始化用户界面功能");
    
    // 获取所有相关元素
    const userProfile = document.querySelector('.user-profile');
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    
    // 检查用户是否已登录
    const userToken = localStorage.getItem('userToken');
    
    console.log("User profile元素:", userProfile);
    console.log("Profile按钮元素:", profileBtn);
    
    // 如果用户未登录，点击整个user-profile区域应该跳转到登录页面
    if (!userToken && userProfile) {
        userProfile.style.cursor = 'pointer';
        
        userProfile.addEventListener('click', function(event) {
            // 仅当点击的不是profileBtn或其子元素时才跳转
            if (!profileBtn || !profileBtn.contains(event.target)) {
                console.log("点击用户图标，跳转到登录页面");
                window.location.href = 'login.html';
            }
        });
    }
    
    // 无论是否登录，profile按钮都应该显示下拉菜单
    if (profileBtn && dropdownMenu) {
        profileBtn.addEventListener('click', function(event) {
            console.log("点击个人资料按钮，显示下拉菜单");
            event.preventDefault();
            event.stopPropagation();
            dropdownMenu.classList.toggle('show-dropdown');
        });
        
        // 点击文档其他区域关闭下拉菜单
        document.addEventListener('click', function(event) {
            if (dropdownMenu.classList.contains('show-dropdown') && 
                !dropdownMenu.contains(event.target) && 
                !profileBtn.contains(event.target)) {
                console.log("点击其他区域，关闭下拉菜单");
                dropdownMenu.classList.remove('show-dropdown');
            }
        });
    }
    
    // 登录和注册按钮的点击事件
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            console.log("点击登录按钮");
            window.location.href = 'login.html';
            return false; // 阻止默认行为
        });
    }
    
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            console.log("点击注册按钮");
            window.location.href = 'register.html';
            return false; // 阻止默认行为
        });
    }
 });
 
 
 // 产品数据示例
 const products = [
    { name: "Boy Shirt", link: "#boy-shirt" },
    { name: "Boy sports", link: "#boy-sports" },
    { name: "Girl Blouse", link: "#girl-blouse" },
    { name: "Gril Dress", link: "#gril-dress" },
    { name: "Secondary Polo shirt", link: "#secondary-polo-shirt" },
    { name: "Girl Culotte", link: "#girl-culotte" },
    { name: "PE shorts", link: "#pe-shorts" },
    { name: "PE shirt", link: "#pe-shirt" },
    { name: "IB polo shirt", link: "#ib-polo-shirt" }
 ];
 
 
 function toggleSearch() {
    const searchContainer = document.getElementById('search-container');
    searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
 }
 
 
 document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.nav-icons a[href="#search"]');
    const searchDropdown = document.querySelector('.search-dropdown');
 
 
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        searchDropdown.style.display = searchDropdown.style.display === 'none' ? 'block' : 'none';
    });
 
 
    const navbarSearchInput = document.getElementById('navbar-search-input');
    navbarSearchInput.addEventListener('input', function() {
        searchProducts(navbarSearchInput.value);
    });
 });
 
 
 function searchProducts(query) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
 
 
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
 
 
    filteredProducts.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `<a href="${product.link}">${product.name}</a>`;
        resultsContainer.appendChild(resultItem);
    });
 }
 function scrollToSearch() {
    const searchInput = document.querySelector('.search-box input');
    // 平滑滚动到搜索框位置
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // 等待滚动完成后聚焦搜索框
    setTimeout(() => {
        searchInput.focus();
    }, 500);
 }
 // 添加或更新 scrollToProducts 函数
 function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
 }
 
 
 // 确保函数在全局作用域可用
 window.scrollToProducts = scrollToProducts;
 
 
 // 购物车功能
 let currentProduct = null;
 const modal = document.getElementById('size-modal');
 const sizeOptions = document.querySelector('.size-options');
 const confirmButton = document.getElementById('confirm-add-to-cart');
 const closeModal = document.querySelector('.close-modal');
 
 
 // 初始化事件监听器
 document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('size-modal');
    const sizeOptions = document.querySelector('.size-options');
    const confirmButton = document.getElementById('confirm-add-to-cart');
    const closeModal = document.querySelector('.close-modal');
    let currentProduct = null;
 
 
    // 为所有 Add to Cart 按钮添加点击事件
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            currentProduct = {
                name: productCard.querySelector('h4').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src,
                sizes: productCard.querySelector('.size').textContent
                    .replace('Size: ', '')
                    .split(' - ')
            };
           
            // 生成尺码选项
            sizeOptions.innerHTML = '';
            const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
            sizes.forEach(size => {
                if (currentProduct.sizes.includes(size)) {
                    const sizeBtn = document.createElement('div');
                    sizeBtn.className = 'size-option';
                    sizeBtn.textContent = size;
                    sizeBtn.onclick = () => selectSize(sizeBtn);
                    sizeOptions.appendChild(sizeBtn);
                }
            });
           
            modal.style.display = 'block';
        });
    });
 
 
    // 确认添加到购物车
    confirmButton.addEventListener('click', function() {
        const selectedSize = document.querySelector('.size-option.selected');
        const quantity = document.getElementById('quantity').value;
       
        if (!selectedSize) {
            alert('Please select size');
            return;
        }
       
        addToCart({
            ...currentProduct,
            selectedSize: selectedSize.textContent,
            quantity: quantity
        });
       
        modal.style.display = 'none';
    });
 
 
    // 关闭弹窗
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
 
 
    // 点击弹窗外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
 });
 
 
 // 选择尺码
 function selectSize(element) {
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    element.classList.add('selected');
 }
 
 
 // 添加到购物车
 function addToCart(product) {
    if (!product || !product.name || !product.selectedSize || !product.quantity) {
        alert('Invalid product information');
        return;
    }
 
 
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) {
        console.error('Cart container not found');
        return;
    }
 
 
    // 使用模板创建购物车项
    const template = document.getElementById('cart-item-template');
    const cartItem = template.content.cloneNode(true);
 
 
    // 填充购物车项数据
    cartItem.querySelector('.cart-item-image').src = product.image;
    cartItem.querySelector('.cart-item-image').alt = product.name;
    cartItem.querySelector('.cart-item-title').textContent = product.name;
    cartItem.querySelector('.cart-item-size').textContent = `Size: ${product.selectedSize}`;
    cartItem.querySelector('.cart-item-quantity span').textContent = product.quantity;
 
 
    const price = product.price.replace('฿', '').split('-')[0];
    const totalPrice = parseFloat(price) * parseInt(product.quantity);
    cartItem.querySelector('.cart-item-price').textContent = `฿${totalPrice.toFixed(2)}`;
 
 
    // 添加事件监听器
    cartItem.querySelector('.quantity-decrease').onclick = function() {
        updateQuantity(this, -1);
    };
    cartItem.querySelector('.quantity-increase').onclick = function() {
        updateQuantity(this, 1);
    };
    cartItem.querySelector('.remove-item').onclick = function() {
        removeFromCart(this);
    };
 
 
    cartContainer.appendChild(cartItem);
    updateCartTotal();
    saveCartToLocalStorage();
    alert('Item added to cart successfully!');
 }
 
 
 // 更新商品数量
 function updateQuantity(button, change) {
    const quantitySpan = button.parentElement.querySelector('span');
    let quantity = parseInt(quantitySpan.textContent);
    quantity = Math.max(1, quantity + change);
    quantitySpan.textContent = quantity;
   
    // 更新价格
    const cartItem = button.closest('.cart-item');
    const priceDiv = cartItem.querySelector('.cart-item-price');
    const basePrice = parseFloat(priceDiv.textContent.replace('฿', '')) / (quantity - change);
    priceDiv.textContent = `฿${(basePrice * quantity).toFixed(2)}`;
   
    updateCartTotal();
    saveCartToLocalStorage();
 }
 
 
 // 从购物车中移除商品
 function removeFromCart(button) {
    if (confirm('Are you sure you want to remove this item?')) {
        const cartItem = button.closest('.cart-item');
        cartItem.remove();
        updateCartTotal();
        saveCartToLocalStorage();
    }
 }
 
 
 // 更新购物车总价
 function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('฿', ''));
        const quantity = parseInt(item.querySelector('.cart-item-quantity span').textContent);
        total += price * quantity;
    });
    
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        window.cartTotal = total; // 保存总价到全局变量
        cartTotalElement.textContent = total.toFixed(2);
    }
    
    // 重新计算总价（包含配送费）
    calculateTotalWithDelivery();
}

 
 // 计算含配送费用的总价
 function calculateTotalWithDelivery() {
     const subtotal = window.cartSubtotal || 0;
     const deliveryFee = parseFloat(document.getElementById('delivery-fee').textContent) || 0;
     const total = subtotal + deliveryFee;
     
     const totalWithDeliveryElement = document.getElementById('total-with-delivery');
     if (totalWithDeliveryElement) {
         totalWithDeliveryElement.textContent = `${total.toFixed(2)}`;
     }
 }

 
 // 更新购物车总价的函数
 function updateCartTotal() {
     const cartItems = document.querySelectorAll('.cart-item');
     let total = 0;
    
     cartItems.forEach(item => {
         const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('฿', ''));
         const quantity = parseInt(item.querySelector('.cart-item-quantity span').textContent);
         total += price * quantity;
     });
    
     const totalElement = document.getElementById('cart-total');
     if (totalElement) {
         totalElement.textContent = `Total Price: ฿${total.toFixed(2)}`;
     }
     
     // 保存小计到全局变量，供配送费用计算使用
     window.cartSubtotal = total;
     
     // 如果已经选择了配送方式，重新计算总价
     calculateTotalWithDelivery();
 }

 
 // 更新购物车总价
 function updateCartTotal() {
     const cartItems = document.querySelectorAll('.cart-item');
     let total = 0;
    
     cartItems.forEach(item => {
         const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('฿', ''));
         total += price;
     });
    
     const totalElement = document.getElementById('cart-total');
     if (totalElement) {
         totalElement.textContent = `Total: ฿${total.toFixed(2)}`;
     }
 }
 
 
 // 保存购物车数据到本地存储
 function saveCartToLocalStorage() {
     const cartItems = document.querySelectorAll('.cart-item');
     const cartData = Array.from(cartItems).map(item => ({
         name: item.querySelector('.cart-item-title').textContent,
         size: item.querySelector('.cart-item-size').textContent.replace('Size: ', ''),
         quantity: item.querySelector('.cart-item-quantity span').textContent,
         price: item.querySelector('.cart-item-price').textContent,
         image: item.querySelector('img').src
     }));
    
     localStorage.setItem('cartItems', JSON.stringify(cartData));
 }
 });
 
 
 
 
 function generateSizeOptions(minSize, maxSize) {
     const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'XXL'];
     let startIndex = sizes.indexOf(minSize);
     let endIndex = sizes.indexOf(maxSize);
    
     // 特殊处理 XXL 的情况
     if (maxSize === 'XXL') {
         endIndex = sizes.indexOf('XXL');
     }
    
     // 修正 Secondary Polo shirt 的尺码范围
     if (minSize === 'S' && maxSize === '3XL') {
         startIndex = sizes.indexOf('S');
         endIndex = sizes.indexOf('3XL');
     }
    
     if (startIndex === -1 || endIndex === -1) {
         return '<div class="size-option">One Size</div>';
     }
    
     return sizes
         .slice(startIndex, endIndex + 1)
         .map(size => `<div class="size-option">${size}</div>`)
         .join('');
 }
 document.addEventListener('DOMContentLoaded', function() {
     const modal = document.getElementById('size-modal');
     const closeModal = document.querySelector('.close-modal');
     const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
     const confirmAddToCart = document.getElementById('confirm-add-to-cart');
     const cartContainer = document.getElementById('cart-container');
     const totalPriceElement = document.createElement('div');
     totalPriceElement.className = 'total-price';
     cartContainer.appendChild(totalPriceElement);
     let currentProduct = null;
     let totalPrice = 0;
    
     // 为每个"Add to Cart"按钮添加点击事件
     addToCartButtons.forEach(button => {
         button.addEventListener('click', function() {
             const productCard = button.closest('.product-card');
             const productName = productCard.querySelector('h4').textContent;
             const priceText = productCard.querySelector('.price').textContent;
             const sizeText = productCard.querySelector('.size').textContent;
            
             // 解析价格
             const priceRange = priceText.replace('฿', '').split('-');
             const price = parseFloat(priceRange[0]);
    
    
             // 设置当前产品信息
             currentProduct = {
                 name: productName,
                 price: price,
                 image: productCard.querySelector('img').src
             };
    
    
             // 显示模态框
             document.getElementById('modal-product-name').textContent = productName;
             document.querySelector('.modal-price').textContent = `฿${price.toFixed(2)}`;
            
             // 生成尺码选项
             const sizeOptions = document.querySelector('.size-options');
             sizeOptions.innerHTML = '';
             const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
             sizes.forEach(size => {
                 const sizeBtn = document.createElement('button');
                 sizeBtn.className = 'size-option';
                 sizeBtn.textContent = size;
                 sizeBtn.onclick = function() {
                     document.querySelectorAll('.size-option').forEach(btn =>
                         btn.classList.remove('selected'));
                     this.classList.add('selected');
                 };
                 sizeOptions.appendChild(sizeBtn);
             });
    
    
             modal.style.display = 'block';
         });
     });
    
    
     // 确认添加到购物车
     confirmAddToCart.addEventListener('click', function() {
         const selectedSize = document.querySelector('.size-option.selected');
         const quantity = parseInt(document.getElementById('quantity').value, 10);
        
         if (!selectedSize) {
             alert('Please select a size');
             return;
         }
    
    
         if (currentProduct) {
             addToCart(currentProduct, selectedSize.textContent, quantity);
             modal.style.display = 'none';
             document.getElementById('quantity').value = '1';
         }
     });
    
    
     // 关闭模态框
     closeModal.addEventListener('click', function() {
         modal.style.display = 'none';
     });
    
    
     // 添加到购物车
     function addToCart(product, size, quantity) {
         const cartItem = document.createElement('div');
         cartItem.className = 'cart-item';
         const itemTotalPrice = product.price * quantity;
         totalPrice += itemTotalPrice;
    
    
         cartItem.innerHTML = `
             <img src="${product.image}" alt="${product.name}" class="cart-item-image">
             <div class="cart-item-details">
                 <div class="cart-item-title">${product.name}</div>
                 <div class="cart-item-size">Size: ${size}</div>
                 <div class="cart-item-quantity">Quantity: ${quantity}</div>
                 <div class="cart-item-price">฿${itemTotalPrice.toFixed(2)}</div>
             </div>
             <button class="remove-item">
                 <i class="fas fa-trash"></i>
             </button>
         `;
    
    
         cartContainer.insertBefore(cartItem, totalPriceElement);
    
    
         // 更新总价格
         updateTotalPrice();
    
    
         // 添加删除功能
         cartItem.querySelector('.remove-item').addEventListener('click', function() {
             totalPrice -= itemTotalPrice;
             cartItem.remove();
             updateTotalPrice();
         });
     }
    
    
     // 更新总价格
     function updateTotalPrice() {
         totalPriceElement.textContent = `Total Price: ฿${totalPrice.toFixed(2)}`;
     }
    
    
     // 生成尺码范围
     function generateSizeRange(start, end) {
         const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
         const startIndex = sizes.indexOf(start);
         const endIndex = sizes.indexOf(end);
         return sizes.slice(startIndex, endIndex + 1);
     }
 });
 

     const sizeForm = document.getElementById('size-form');
     sizeForm.addEventListener('submit', function(event) {
         event.preventDefault();

         const height = parseInt(document.getElementById('height').value, 10);
         const chest = parseInt(document.getElementById('chest').value, 10);
         const waist = parseInt(document.getElementById('waist').value, 10);
         const hip = parseInt(document.getElementById('hip').value, 10);

         const size = calculateSize(height, chest, waist, hip);
         showSizePopup(size);
     });

     function calculateSize(height, chest, waist, hip) {
         // 根据提供的表格数据计算尺码
         if (height >= 140 && height <= 145 && chest >= 63 && chest <= 67 && waist >= 45 && waist <= 49 && hip >= 72 && hip <= 76) {
             return 'XXXS';
         } else if (height >= 145 && height <= 150 && chest >= 67 && chest <= 71 && waist >= 49 && waist <= 53 && hip >= 76 && hip <= 80) {
             return 'XXS';
         } else if (height >= 150 && height <= 155 && chest >= 71 && chest <= 76 && waist >= 53 && waist <= 57 && hip >= 80 && hip <= 84) {
             return 'XSS';
         } else if (height >= 155 && height <= 160 && chest >= 76 && chest <= 80 && waist >= 57 && waist <= 61 && hip >= 84 && hip <= 88) {
             return 'XS';
         } else if (height >= 160 && height <= 165 && chest >= 80 && chest <= 84 && waist >= 61 && waist <= 65 && hip >= 88 && hip <= 92) {
             return 'S';
         } else if (height >= 165 && height <= 170 && chest >= 84 && chest <= 88 && waist >= 65 && waist <= 69 && hip >= 92 && hip <= 96) {
             return 'M';
         } else if (height >= 170 && height <= 175 && chest >= 92 && chest <= 96 && waist >= 73 && waist <= 77 && hip >= 100 && hip <= 104) {
             return 'L';
         } else if (height >= 175 && height <= 180 && chest >= 100 && chest <= 104 && waist >= 81 && waist <= 85 && hip >= 108 && hip <= 112) {
             return 'XL';
         } else if (height >= 180 && height <= 185 && chest >= 108 && chest <= 112 && waist >= 89 && waist <= 93 && hip >= 116 && hip <= 120) {
             return 'XXL';
         } else if (height >= 185 && height <= 190 && chest >= 116 && chest <= 120 && waist >= 97 && waist <= 101 && hip >= 124 && hip <= 128) {
             return 'XXXL';
         } else if (height >= 190 && height <= 195 && chest >= 120 && chest <= 124 && waist >= 101 && waist <= 105 && hip >= 128 && hip <= 132) {
             return '4XL';
         } else if (height >= 195 && height <= 200 && chest >= 124 && chest <= 128 && waist >= 105 && waist <= 109 && hip >= 132 && hip <= 136) {
             return '5XL';
         } else {
             return 'Size not found';
         }
     }

     function showSizePopup(size) {
         const popup = document.createElement('div');
         popup.className = 'size-popup';
         popup.textContent = `Recommended Size: ${size}`;
         document.body.appendChild(popup);

         setTimeout(() => {
             popup.remove();
         }, 3000);
     }

     // 配送费用计算
const deliveryRates = {
    // 基于学校位置（Bang Na）计算到各区的预估距离和费用
    bangbon: { base: 35, perKm: 10, distance: 15 },
    bangkapi: { base: 35, perKm: 10, distance: 8 },
    bangkhae: { base: 35, perKm: 10, distance: 16 },
    bangkhen: { base: 35, perKm: 10, distance: 12 },
    bangkholaem: { base: 35, perKm: 10, distance: 6 },
    bangkhunthian: { base: 35, perKm: 10, distance: 18 },
    bangna: { base: 35, perKm: 10, distance: 1 },
    bangphlat: { base: 35, perKm: 10, distance: 14 },
    bangrak: { base: 35, perKm: 10, distance: 8 },
    bangsue: { base: 35, perKm: 10, distance: 15 },
    bangkoknoi: { base: 35, perKm: 10, distance: 16 },
    bangkokyai: { base: 35, perKm: 10, distance: 15 },
    buengkum: { base: 35, perKm: 10, distance: 10 },
    chatuchak: { base: 35, perKm: 10, distance: 13 },
    chomthong: { base: 35, perKm: 10, distance: 12 },
    dindaeng: { base: 35, perKm: 10, distance: 11 },
    donmueang: { base: 35, perKm: 10, distance: 20 },
    dusit: { base: 35, perKm: 10, distance: 14 },
    huaikhwang: { base: 35, perKm: 10, distance: 10 },
    khannayao: { base: 35, perKm: 10, distance: 12 },
    khlongsamwa: { base: 35, perKm: 10, distance: 15 },
    khlongsan: { base: 35, perKm: 10, distance: 13 },
    khlongtoei: { base: 35, perKm: 10, distance: 4 },
    laksi: { base: 35, perKm: 10, distance: 18 },
    latkrabang: { base: 35, perKm: 10, distance: 8 },
    latphrao: { base: 35, perKm: 10, distance: 12 },
    minburi: { base: 35, perKm: 10, distance: 16 },
    nongchok: { base: 35, perKm: 10, distance: 25 },
    nongkhaem: { base: 35, perKm: 10, distance: 20 },
    pathumwan: { base: 35, perKm: 10, distance: 10 },
    phasicharoen: { base: 35, perKm: 10, distance: 16 },
    phayathai: { base: 35, perKm: 10, distance: 12 },
    phrakanong: { base: 35, perKm: 10, distance: 3 },
    phranakhon: { base: 35, perKm: 10, distance: 13 },
    pomprap: { base: 35, perKm: 10, distance: 12 },
    prawet: { base: 35, perKm: 10, distance: 5 },
    ratburana: { base: 35, perKm: 10, distance: 8 },
    ratchathewi: { base: 35, perKm: 10, distance: 11 },
    saimai: { base: 35, perKm: 10, distance: 22 },
    samphanthawong: { base: 35, perKm: 10, distance: 11 },
    saphansing: { base: 35, perKm: 10, distance: 7 },
    sathorn: { base: 35, perKm: 10, distance: 9 },
    suanluang: { base: 35, perKm: 10, distance: 6 },
    talingchan: { base: 35, perKm: 10, distance: 19 },
    thawiwatthana: { base: 35, perKm: 10, distance: 22 },
    thonburi: { base: 35, perKm: 10, distance: 15 },
    thungkhru: { base: 35, perKm: 10, distance: 10 },
    wangthonglang: { base: 35, perKm: 10, distance: 9 },
    watthana: { base: 35, perKm: 10, distance: 7 },
    yannawa: { base: 35, perKm: 10, distance: 7 }
};

// 更新配送地址表单的区域选项
const districtSelect = document.getElementById('district');
if (districtSelect) {
    districtSelect.innerHTML = `
        <option value="">Select District</option>
        <option value="bangbon">Bang Bon (10150)</option>
        <option value="bangkapi">Bang Kapi (10240)</option>
        <option value="bangkhae">Bang Khae (10160)</option>
        <option value="bangkhen">Bang Khen (10220)</option>
        <option value="bangkholaem">Bang Kho Laem (10120)</option>
        <option value="bangkhunthian">Bang Khun Thian (10150)</option>
        <option value="bangna">Bang Na (10260)</option>
        <option value="bangphlat">Bang Phlat (10700)</option>
        <option value="bangrak">Bang Rak (10500)</option>
        <option value="bangsue">Bang Sue (10800)</option>
        <option value="bangkoknoi">Bangkok Noi (10700)</option>
        <option value="bangkokyai">Bangkok Yai (10600)</option>
        <option value="buengkum">Bueng Kum (10240)</option>
        <option value="chatuchak">Chatuchak (10900)</option>
        <option value="chomthong">Chom Thong (10150)</option>
        <option value="dindaeng">Din Daeng (10400)</option>
        <option value="donmueang">Don Mueang (10210)</option>
        <option value="dusit">Dusit (10300)</option>
        <option value="huaikhwang">Huai Khwang (10310)</option>
        <option value="khannayao">Khan Na Yao (10230)</option>
        <option value="khlongsamwa">Khlong Sam Wa (10510)</option>
        <option value="khlongsan">Khlong San (10600)</option>
        <option value="khlongtoei">Khlong Toei (10110)</option>
        <option value="laksi">Lak Si (10210)</option>
        <option value="latkrabang">Lat Krabang (10520)</option>
        <option value="latphrao">Lat Phrao (10230)</option>
        <option value="minburi">Min Buri (10510)</option>
        <option value="nongchok">Nong Chok (10530)</option>
        <option value="nongkhaem">Nong Khaem (10160)</option>
        <option value="pathumwan">Pathum Wan (10330)</option>
        <option value="phasicharoen">Phasi Charoen (10160)</option>
        <option value="phayathai">Phaya Thai (10400)</option>
        <option value="phrakanong">Phra Khanong (10260)</option>
        <option value="phranakhon">Phra Nakhon (10200)</option>
        <option value="pomprap">Pom Prap Sattru Phai (10100)</option>
        <option value="prawet">Prawet (10250)</option>
        <option value="ratburana">Rat Burana (10140)</option>
        <option value="ratchathewi">Ratchathewi (10400)</option>
        <option value="saimai">Sai Mai (10220)</option>
        <option value="samphanthawong">Samphanthawong (10100)</option>
        <option value="saphansing">Saphan Sung (10240)</option>
        <option value="sathorn">Sathon (10120)</option>
        <option value="suanluang">Suan Luang (10250)</option>
        <option value="talingchan">Taling Chan (10170)</option>
        <option value="thawiwatthana">Thawi Watthana (10170)</option>
        <option value="thonburi">Thon Buri (10600)</option>
        <option value="thungkhru">Thung Khru (10140)</option>
        <option value="wangthonglang">Wang Thonglang (10310)</option>
        <option value="watthana">Watthana (10110)</option>
        <option value="yannawa">Yan Nawa (10120)</option>
    `;
}

// 监听配送方式选择
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const addressForm = document.getElementById('delivery-address-form');
        const feeDisplay = document.getElementById('delivery-fee-display');
        
        if (this.value === 'line-man') {
            addressForm.style.display = 'block';
            feeDisplay.style.display = 'block';
        } else {
            addressForm.style.display = 'none';
            feeDisplay.style.display = 'none';
            document.getElementById('delivery-fee').textContent = '0';
            updateTotal();
        }
    });
});

// 计算配送费用
function calculateDeliveryFee() {
    const district = document.getElementById('district').value;
    const feeElement = document.getElementById('delivery-fee');

    if (district && deliveryRates[district]) {
        const rate = deliveryRates[district];
        const fee = rate.base + (rate.distance * rate.perKm);
        feeElement.textContent = fee;
        calculateTotal();
    }
}

// 计算含配送费用的总价
function calculateTotalWithDelivery() {
    // 获取商品总价
    const cartTotal = parseFloat(document.querySelector('.total-price').textContent.replace('Total Price: ฿', '')) || 0;
    // 获取配送费
    const deliveryFee = parseFloat(document.getElementById('delivery-fee').textContent) || 0;
    
    // 计算总价
    const total = cartTotal + deliveryFee;
    
    // 更新显示
    const totalWithDeliveryElement = document.getElementById('total-with-delivery');
    if (totalWithDeliveryElement) {
        totalWithDeliveryElement.textContent = `${total.toFixed(2)}`;
    }
}

// 更新购物车总价
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('฿', ''));
        total += price;
    });
    
    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `฿${total.toFixed(2)}`;
    }
}

// 简化的用户图标点击事件处理
document.addEventListener('DOMContentLoaded', function() {
    const userProfile = document.querySelector('.user-profile');
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // 为用户图标添加点击事件（跳转到登录页面）
    if (userProfile) {
        userProfile.addEventListener('click', function(event) {
            // 如果点击的不是下拉菜单按钮，则跳转到登录页面
            if (!profileBtn.contains(event.target)) {
                window.location.href = 'login.html';
            }
        });
    }
    
    // 为下拉菜单按钮添加点击事件
    if (profileBtn && dropdownMenu) {
        profileBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // 阻止事件冒泡
            dropdownMenu.classList.toggle('show-dropdown');
        });
        
        // 点击文档其他区域关闭下拉菜单
        document.addEventListener('click', function(event) {
            if (!dropdownMenu.contains(event.target) && !profileBtn.contains(event.target)) {
                dropdownMenu.classList.remove('show-dropdown');
            }
        });
    }
});

// 优化购物车数量调整功能
document.addEventListener('DOMContentLoaded', function() {
    initQuantityControls();
    calculateTotal();

    function initQuantityControls() {
        document.querySelectorAll('.cart-item').forEach(item => {
            const quantityText = item.querySelector('.quantity');
            if (quantityText && !quantityText.querySelector('.quantity-container')) {
                const currentQuantity = parseInt(quantityText.textContent.split(':')[1].trim()) || 1;
                const quantityContainer = createQuantityControls(currentQuantity, item);
                quantityText.innerHTML = 'Quantity: ';
                quantityText.appendChild(quantityContainer);
            }
        });
    }

    function createQuantityControls(currentQuantity, item) {
        const quantityContainer = document.createElement('div');
        quantityContainer.className = 'quantity-container';

        const decreaseBtn = createButton('-', () => updateQuantity(item, -1));
        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity-value';
        quantityDisplay.textContent = currentQuantity;
        const increaseBtn = createButton('+', () => updateQuantity(item, 1));

        quantityContainer.append(decreaseBtn, quantityDisplay, increaseBtn);
        return quantityContainer;
    }

    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.className = 'quantity-btn';
        button.textContent = text;
        button.onclick = onClick;
        return button;
    }

    function updateQuantity(item, change) {
        const quantityDisplay = item.querySelector('.quantity-value');
        let quantity = Math.max(1, parseInt(quantityDisplay.textContent) + change);
        quantityDisplay.textContent = quantity;
        updateItemPrice(item, quantity);
        calculateTotal();
    }

    function updateItemPrice(item, quantity) {
        const priceElement = item.querySelector('.price');
        const unitPrice = parseFloat(item.getAttribute('data-unit-price'));
        priceElement.textContent = `฿${(unitPrice * quantity).toFixed(2)}`;
    }

    function calculateTotal() {
        let subtotal = Array.from(document.querySelectorAll('.cart-item')).reduce((total, item) => {
            const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('฿', '')) || 0;
            return total + price;
        }, 0);

        const deliveryFee = parseFloat(document.getElementById('delivery-fee')?.textContent.replace('฿', '')) || 0;
        const total = subtotal + deliveryFee;
        const totalWithDeliveryElement = document.getElementById('total-with-delivery');
        if (totalWithDeliveryElement) {
            totalWithDeliveryElement.textContent = `฿${total.toFixed(2)}`;
        }
    }

    const districtSelect = document.getElementById('district');
    if (districtSelect) {
        districtSelect.addEventListener('change', function() {
            calculateDeliveryFee();
            calculateTotal();
        });
    }

    function calculateDeliveryFee() {
        const district = document.getElementById('district').value;
        const feeElement = document.getElementById('delivery-fee');

        if (district && deliveryRates[district] && feeElement) {
            const rate = deliveryRates[district];
            const fee = rate.base + (rate.distance * rate.perKm);
            feeElement.textContent = `฿${fee}`;
            calculateTotal();
        }
    }
});

// 确保在购物车变更时总价实时更新
document.addEventListener('DOMContentLoaded', function() {
    // 监听购物车添加事件
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            // 添加商品后延迟计算总价，确保DOM已更新
            setTimeout(calculateTotal, 100);
        });
    });
    
    // 使用事件委托监听购物车数量变化
    document.addEventListener('click', function(event) {
        // 检查是否点击了数量按钮
        if (event.target.classList.contains('quantity-btn') || 
            event.target.closest('.quantity-btn')) {
            // 点击数量按钮后延迟计算总价
            setTimeout(calculateTotal, 100);
        }
        
        // 检查是否点击了移除按钮
        if (event.target.classList.contains('remove-item') || 
            event.target.closest('.remove-item')) {
            // 移除商品后延迟计算总价
            setTimeout(calculateTotal, 100);
        }
    });
    
    // 监听配送选项变化
    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', function() {
            setTimeout(calculateTotal, 100);
        });
    });
    
    // 初始计算总价
    calculateTotal();
    
    // 监听区域选择变化
    const districtSelect = document.getElementById('district');
    if (districtSelect) {
        districtSelect.addEventListener('change', function() {
            calculateDeliveryFee();
            calculateTotal();
        });
    }
});

// 计算总价，包括配送费
function calculateTotal() {
    // 获取商品总价
    const cartItems = document.querySelectorAll('.cart-item');
    let cartTotal = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.cart-item-price').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
        const quantity = parseInt(item.querySelector('.quantity-value').textContent) || 1;
        cartTotal += price * quantity;
    });
    
    // 更新总价显示
    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `฿${cartTotal.toFixed(2)}`;
    }
    
    // 获取配送费
    const deliveryFeeElement = document.getElementById('delivery-fee');
    let deliveryFee = 0;
    if (deliveryFeeElement) {
        deliveryFee = parseFloat(deliveryFeeElement.textContent.replace(/[^0-9.]/g, '')) || 0;
    }
    
    // 计算总价（商品总价 + 配送费）
    const total = cartTotal + deliveryFee;
    
    // 更新显示总价
    const totalWithDeliveryElement = document.getElementById('total-with-delivery');
    if (totalWithDeliveryElement) {
        totalWithDeliveryElement.textContent = `${total.toFixed(2)}`;
        console.log(`商品总价: ${cartTotal} + 配送费: ${deliveryFee} = 总价: ${total}`);
    }
}

// 购物车功能增强
function initializeCart() {
    // 从本地存储恢复购物车
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        try {
            const cartItems = JSON.parse(savedCart);
            const cartContainer = document.getElementById('cart-container');
            
            // 清空现有购物车（除了模板）
            const template = document.getElementById('cart-item-template');
            cartContainer.innerHTML = '';
            if (template) cartContainer.appendChild(template);
            
            // 添加保存的商品
            cartItems.forEach(item => {
                addItemToCart(item.name, item.price, item.size, item.quantity, item.image);
            });
            
            // 更新总价
            updateCartTotal();
        } catch (e) {
            console.error('恢复购物车出错:', e);
        }
    }
    
    // 添加购物车项目删除功能
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item') || 
            event.target.closest('.remove-item')) {
            const cartItem = event.target.closest('.cart-item');
            if (cartItem) {
                cartItem.remove();
                updateCartTotal();
                saveCartToLocalStorage();
            }
        }
    });
}

// 立即执行这部分代码以修复checkout按钮的点击事件
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded事件已触发");
    
    // 获取checkout按钮
    const checkoutButton = document.getElementById('checkout-button');
    console.log("Checkout按钮:", checkoutButton);
    
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            console.log("Checkout按钮被点击");
            goToOrderConfirmation();
        });
    } else {
        // 尝试通过类名查找
        const checkoutButtons = document.querySelectorAll('.checkout-button, button:contains("Checkout")');
        if (checkoutButtons.length > 0) {
            checkoutButtons.forEach(button => {
                button.addEventListener('click', function() {
                    console.log("找到的Checkout按钮被点击");
                    goToOrderConfirmation();
                });
            });
        } else {
            console.error("找不到结账按钮，请检查HTML");
        }
    }
    
    // 为所有可能的结账按钮添加事件
    document.addEventListener('click', function(event) {
        const target = event.target;
        if (target.id === 'checkout-button' || 
            target.classList.contains('checkout-button') ||
            (target.tagName.toLowerCase() === 'button' && target.textContent.includes('Checkout'))) {
            
            console.log("通过事件委托找到结账按钮点击");
            event.preventDefault();
            goToOrderConfirmation();
        }
    });
});

// 确保这个函数能正常工作
function goToOrderConfirmation() {
    console.log("正在处理订单确认...");
    
    // 检查购物车是否为空
    const cartItems = document.querySelectorAll('.cart-item:not(#cart-item-template)');
    if (cartItems.length === 0) {
        alert('您的购物车是空的，请添加商品再结账。');
        return;
    }
    
    // 保存当前购物车数据
    saveOrderData();
    console.log("订单数据已保存");
    
    // 直接跳转到订单确认页面
    console.log("正在跳转到订单确认页面");
    window.location.href = 'order-confirmation.html';
}

// 简化的saveOrderData函数，确保能正常工作
function saveOrderData() {
    // 收集购物车商品信息
    const items = [];
    const cartItems = document.querySelectorAll('.cart-item:not(#cart-item-template)');
    
    cartItems.forEach(item => {
        const title = item.querySelector('.cart-item-title')?.textContent || 'Product';
        const price = item.querySelector('.cart-item-price')?.textContent || '฿0';
        const size = item.querySelector('.cart-item-size')?.textContent || 'Default';
        const quantity = item.querySelector('.quantity-value')?.textContent || '1';
        const image = item.querySelector('img')?.src || '';
        
        items.push({ title, price, size, quantity, image });
    });
    
    // 收集配送信息
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked')?.value || 'self-pickup';
    const district = document.getElementById('district')?.value || '';
    const address = document.getElementById('address')?.value || '';
    const deliveryFee = document.getElementById('delivery-fee')?.textContent || '0';
    
    // 创建订单数据对象
    const orderData = {
        items,
        delivery: {
            method: deliveryMethod,
            district,
            address,
            fee: deliveryFee
        },
        totalPrice: document.getElementById('total-with-delivery')?.textContent || '0.00',
        date: new Date().toLocaleDateString()
    };
    
    // 保存到本地存储
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    console.log("订单数据已保存到localStorage:", orderData);
}

// 在订单确认页面加载订单数据
document.addEventListener('DOMContentLoaded', function() {
    const orderData = JSON.parse(localStorage.getItem('pendingOrder'));
    if (!orderData) {
        document.getElementById('order-confirmation-container').innerHTML = `
            <div class="order-summary">
                <h2>No order data found</h2>
                <p>Please return to the cart page and try checking out again.</p>
                <div class="order-actions">
                    <button onclick="window.location.href='index.html#cart'" class="btn-primary">Return to Cart</button>
                </div>
            </div>
        `;
        return;
    }
    
    const orderId = generateOrderId();
    
    const orderDate = new Date(orderData.date || new Date()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const totalPrice = orderData.items.reduce((total, item) => {
        return total + parseFloat(item.price.toString().replace('฿', ''));
    }, 0).toFixed(2);
    
    let html = `
        <div class="order-summary">
            <div class="order-header">
                <h2>Order Confirmation</h2>
                <span class="order-id">Order ID: ${orderId}</span>
                <span class="order-date">Date: ${orderDate}</span>
            </div>
            
            <h3 class="section-title">Items</h3>
            <div class="order-items">
    `;
    
    if (orderData.items && orderData.items.length) {
        orderData.items.forEach(item => {
            const price = item.price.toString().replace('฿', '');
            
            html += `
                <div class="order-item">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="item-details">
                        <h4>${item.title}</h4>
                        <p>Size: ${item.size}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: <span class="price">฿${price}</span></p>
                    </div>
                </div>
            `;
        });
    } else {
        html += `<p>No items</p>`;
    }
    
    html += `
            </div>
            
            <h3 class="section-title">Delivery Information</h3>
            <div class="delivery-summary">
                <p>Delivery Method: ${orderData.delivery.method === 'line-man' ? 'Home Delivery' : 'Self Pickup'}</p>
    `;
    
    if (orderData.delivery.method === 'line-man') {
        html += `
            <p>District: ${orderData.delivery.district}</p>
            <p>Address: ${orderData.delivery.address}</p>
            <p>Delivery Fee: <span class="price">฿${orderData.delivery.fee}</span></p>
        `;
    }
    
    html += `
            </div>
            
            <h3 class="section-title">Price Summary</h3>
            <div class="price-summary">
                <p>Total (including delivery): <span class="total-price">฿${totalPrice}</span></p>
            </div>
            
            <h3 class="section-title">Payment Method</h3>
            <div class="payment-summary">
                <p>Selected payment method: ${localStorage.getItem('paymentMethod') || 'Offline Payment'}</p>
            </div>
            
            <div class="order-actions">
                <button id="confirm-order" class="btn-primary">Confirm Order</button>
                <button id="back-to-cart" class="btn-outline">Return to Cart</button>
            </div>
        </div>
    `;
    
    document.getElementById('order-confirmation-container').innerHTML = html;
    
    document.getElementById('confirm-order').addEventListener('click', completeOrder);
    document.getElementById('back-to-cart').addEventListener('click', function() {
        window.location.href = 'index.html#cart';
    });
});

function generateOrderId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
}

function completeOrder() {
    const orderData = JSON.parse(localStorage.getItem('pendingOrder'));
    if (!orderData) return;
    
    const orderId = generateOrderId();
    
    const order = {
        id: orderId,
        ...orderData,
        status: 'Confirmed',
        paymentStatus: 'Completed',
        createdAt: new Date().toISOString()
    };
    
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    localStorage.removeItem('cartItems');
    localStorage.removeItem('pendingOrder');
    
    showOrderSuccess(orderId);
}

function showOrderSuccess(orderId) {
    const container = document.getElementById('order-confirmation-container');
    
    const html = `
        <div class="order-success">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Order Successfully Submitted!</h2>
            <p>Your Order ID: <strong>${orderId}</strong></p>
            <p>We have sent an order confirmation to your email.</p>
            <p>Thank you for your purchase!</p>
            <div class="success-actions">
                <button onclick="window.location.href='index.html'" class="btn-primary">Continue Shopping</button>
                <button onclick="window.location.href='order-history.html'" class="btn-outline">View My Orders</button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function handleLoginSuccess() {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'profile.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const userIcon = document.getElementById('user-icon');

    if (isLoggedIn) {
        if (loginButton) loginButton.style.display = 'none';
        if (registerButton) registerButton.style.display = 'none';
    }

    if (userIcon) {
        userIcon.addEventListener('click', function() {
            if (isLoggedIn) {
                window.location.href = 'profile.html'; // 导航到个人中心页面
            } else {
                alert('Please log in first.');
            }
        });
    }
});