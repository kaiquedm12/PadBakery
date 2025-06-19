import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from '../firebase/config'

// Serviço para gerenciar produtos
export const productService = {
  // Adicionar produto
  async addProduct(productData) {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return { success: true, id: docRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Buscar todos os produtos
  async getProducts() {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const products = []
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() })
      })
      return { success: true, products }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Buscar produto por ID
  async getProduct(id) {
    try {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { success: true, product: { id: docSnap.id, ...docSnap.data() } }
      } else {
        return { success: false, error: 'Produto não encontrado' }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Atualizar produto
  async updateProduct(id, productData) {
    try {
      const docRef = doc(db, 'products', id)
      await updateDoc(docRef, {
        ...productData,
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Deletar produto
  async deleteProduct(id) {
    try {
      await deleteDoc(doc(db, 'products', id))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Serviço para gerenciar pedidos
export const orderService = {
  // Criar pedido
  async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return { success: true, id: docRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Buscar todos os pedidos
  async getOrders() {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() })
      })
      return { success: true, orders }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Atualizar status do pedido
  async updateOrderStatus(id, status) {
    try {
      const docRef = doc(db, 'orders', id)
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Serviço para gerenciar vendas
export const saleService = {
  // Registrar venda
  async registerSale(saleData) {
    try {
      const docRef = await addDoc(collection(db, 'sales'), {
        ...saleData,
        createdAt: serverTimestamp()
      })
      return { success: true, id: docRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Buscar vendas por período
  async getSalesByPeriod(startDate, endDate) {
    try {
      const q = query(
        collection(db, 'sales'),
        where('createdAt', '>=', startDate),
        where('createdAt', '<=', endDate),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const sales = []
      querySnapshot.forEach((doc) => {
        sales.push({ id: doc.id, ...doc.data() })
      })
      return { success: true, sales }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Serviço para gerenciar compras
export const purchaseService = {
  // Registrar compra
  async registerPurchase(purchaseData) {
    try {
      const docRef = await addDoc(collection(db, 'purchases'), {
        ...purchaseData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return { success: true, id: docRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Buscar compras pendentes
  async getPendingPurchases() {
    try {
      const q = query(
        collection(db, 'purchases'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const purchases = []
      querySnapshot.forEach((doc) => {
        purchases.push({ id: doc.id, ...doc.data() })
      })
      return { success: true, purchases }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
} 