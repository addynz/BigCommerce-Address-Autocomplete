# BigCommerce Address and Postcode Finder Plugin

BigCommerce Address Validation with Google Tag Manager (GTM). The address and postcode finder widget will autocomplete NZ addresses in real time. Using Addy's address finder to validate and verify address forms is one of the best ways to improve conversion rates.

https://www.addy.co.nz/

Addy offers the perfect BigCommerce plugin to ensure essential customer billing and shipping address details are validated right at the point of capture. Reassuring customers that their details are correct also reduces the amount of form-filling with address auto-complete technology - perfect for improving your customer experience. This allows your customers to focus their efforts on completing the checkout easily, increasing your checkout conversion rates and business efficiency. 

Addy’s BigCommerce plugin uses intelligent fuzzy matching of addresses.  This means that if a typo, invalid suburb or partially correct address is entered, customers can still find the right delivery or billing address because the addresses are validated against actual delivery point data from official address sources, including the ![New Zealand Postal Address File (PAF)](faq-where-does-address-lookup-data-come-from).

![BigCommerce Address Autocomplete](https://github.com/addynz/BigCommerce-Address-Autocomplete/blob/master/bigcommerceautocomplete.gif)

## Benefits

- Reduce friction and increase conversion rates with a fast checkout process 
- Create a delightful checkout experience for repeated business
- Deliver to the right address, the first time
- Verify and validate address details in real-time

## Get started
Create a free account to get your Addy API key: <https://www.addy.co.nz/signup>

1. Login to your BigCommerce Admin page.
2. Click on Advanced Settings > Web Analytics in the menu.
3. Check the Google Analytics option and click Save at the bottom.
4. Click on the Google Analytics tab.
5. Copy and paste the code below into the "Tracking Code" box and replace <b>'demo-api-key'</b> with your API key.
6. Click Save and you're done!

```html
<script>
(function(d,w){
    w.addEventListener('DOMContentLoaded', function(){
        var s = document.createElement("SCRIPT");
        s.src = 'https://cdn.addy.co.nz/bigcommerce/1.1.0/addycomplete.js?key=demo-api-key';
        s.type = 'text/javascript';
        s.async = 1;
        d.body.appendChild(s);
    });
})(document, window);
</script>
```

## Prices
Addy's BigCommerce plugin is free of charge; download and install it at no cost.  Just setup an account with Addy to get your 1,500 free completed address lookups per month.  If you require additional address transactions, simply pay as you go. See: https://www.addy.co.nz/pricing

## Links

Official Addy site: <https://www.addy.co.nz/>

Complete BigCommerce Integration Documentation: <https://www.addy.co.nz/address-finder-bigcommerce-plugin>

RESTful API Documentation: <https://www.addy.co.nz/address-search-and-postcode-api>

All Documentation: <https://www.addy.co.nz/documentation>

Frequently Asked Questions: <https://www.addy.co.nz/frequently-asked-questions>

## License

The NZ-Address-Autocomplete code is released under the MIT License, 
which has the same license as awesomplete <https://github.com/LeaVerou/awesomplete>.
