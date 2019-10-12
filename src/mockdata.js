import blueSockImage from "./assets/blue_sock.jpg";

const product = {
    name: "Amazing socks",
    image: blueSockImage,
    description: "Amazing soft socks",
    link: "https://www.happysocks.com/eu/rubber-duck-sock-10.html",
    // isStock: true,
    inventory: 1,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
        {
            variantId: 2234,
            variantColor: "green"
        },
        {
            variantId: 2235,
            variantColor: "blue"
        }
    ],

}

export { product }