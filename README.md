# Desafío

- Forkear este repo
- Clonar tu fork
- Crear y exportar la clase **ListaDeProductos** que extiende la clase **ListaDeCosas**.
- La clase **ListaDeProductos** debe:
  - tener un método addProduct que reciba una instancia de la clase **Product** como parámetro y la agregue usando el método **add** que ya existe en la superclase. El método debe validar que no exista un producto con el mismo id antes de agregarlo
  - extender el constructor original para que además de recibir un nombre para la lista, lea el archivo **products.json** y agregue todos los productos del JSON usando el método addProduct
  - tener un método **getProduct(id:number):Product** que devuelva el producto con ese **id**
  - tener un método **removeProduct(id:number):Product** que elimine el producto con ese **id**
  - tener un método **getSortedByPrice** que reciba un parametro **order:string** con solo dos valores posibles: "asc" o "desc". 
