# Código

Los archivos están en la carpeta ./src

# Para inicializar este proyecto

Correr: `npm install` o `yarn install` en el caso de que utilices yarn.

# Desafío

- Forkear este repo
- Clonar tu fork
- Crear y exportar la clase **ListaDeProductos** que extiende la clase **ListaDeCosas**.
- La clase **ListaDeProductos** debe:
  - tener un método addProduct que reciba una instancia de la clase **Product** como parámetro y la agregue usando el método **add** que ya existe en la superclase. El método debe validar que no exista un producto con el mismo id antes de agregarlo
  - extender el constructor original para que además de recibir un nombre para la lista, lea el archivo **products.json** y agregue todos los productos del JSON usando el método addProduct
  - tener un método **getProduct(id:number):Product** que devuelva el producto con ese **id**
  - tener un método **removeProduct(id:number):Product** que elimine el producto con ese **id**
  - tener un método **getSortedByPrice** que reciba un parametro **order:string** con solo dos valores posibles: "asc" o "desc". (Chequear este link https://mariusschulz.com/blog/string-literal-types-in-typescript#string-literal-types-and-union-types). Este método debe devolver toda la lista de productos **Product[]** en orden _ascendente_ o _descendente_ dependiendo del parámetro **order** usando https://lodash.com/docs/4.17.15#orderBy
- Correr los tests localmente ejecutando `npm run test`y crear un Pull Request desde GitHub

# Tip

Comentá todos los tests del archivo test.ts y andá descomentando los que vayas trabajando.

![image](https://user-images.githubusercontent.com/1208547/143915400-91377ad1-aa0b-4d66-a80d-872af75ab4da.png)

# Para correr los tests ejecutar

`npm run test`

# Para correr los tests en modo watch (reinicia automáticamente)

`npm run test:watch`
# extendiendo_clases_BARBI
