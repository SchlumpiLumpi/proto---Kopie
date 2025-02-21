'use strict'


// IMPORTS
import { spatialAutocorrelation } from "https://episphere.github.io/spatial-autocorrelation/src/autocorrelation.js"

//if (base_data != undefined) {
//VARIABLES
//value for accessing properties value for spatial auto correlation
// var keyValue = "test"
var keyValue = "crude_rate"

///https://stackoverflow.com/questions/55010528/how-to-listen-for-clicks-on-buttons-in-a-bootstrap-drop-down-menu-javascript


// calculate_spatial_auto_correlation(base_data,keyValue)

// CODE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TESTBLOCK:  Add Testproperties to features for debugging, high spatial resolution of features is the problem
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///TEST VALUES for De_Test

//testVal, size 40, between 50 - 500
//var testVal = [356, 152, 127, 499, 293, 171, 188, 333, 443, 167, 478, 285, 263, 409, 90, 102, 78, 232, 417, 145, 373, 334, 318, 296, 444, 489, 85, 336, 403, 394, 206, 405, 267, 326, 191, 71, 283, 62, 227, 150]
//testVal, size 40, between 500 - 1000
//var testVal = [957, 764, 828, 710, 742, 758, 845, 523, 953, 608, 654, 750, 704, 530, 914, 970, 690, 637, 726, 768, 806, 620, 662, 871, 744, 669, 612, 554, 952, 625, 909, 981, 617, 586, 645, 609, 882, 666, 718, 670]
//testVal, size 40, between 1000 - 5000
// var testVal = [4093, 2386, 3023, 1359, 2849, 1345, 1479, 3920, 1513, 3992, 2231, 2058, 2604, 2839, 1761, 3769, 3097, 1694, 2016, 2590, 3374, 1550, 2987, 4327, 4468, 3156, 1134, 4046, 4186, 2875, 1886, 4161, 3534, 2603, 3105, 3981, 3011, 3782, 2402, 3208]
//testVal, size 40, between 5000 - 11000
//var testVal = [10728, 10440, 10870, 6564, 5387, 10373, 9690, 10418, 5952, 9655, 8180, 7940, 8607, 9656, 8934, 7496, 10094, 6687, 6571, 5798, 10855, 7792, 5159, 6238, 8014, 10883, 5800, 9934, 7972, 8323, 6533, 10385, 6610, 9582, 7312, 6612, 8384, 10778, 6506, 5583]

//testVal, size 434, between 50 - 500, long execution
//var testVal = [62, 425, 292, 165, 433, 147, 453, 149, 135, 491, 120, 137, 55, 210, 471, 489, 232, 57, 430, 373, 199, 125, 117, 499, 53, 401, 244, 395, 130, 330, 500, 334, 455, 348, 440, 312, 394, 202, 278, 105, 276, 113, 322, 230, 211, 338, 356, 346, 118, 277, 349, 389, 484, 283, 345, 482, 177, 307, 391, 362, 447, 412, 288, 275, 279, 350, 393, 123, 142, 257, 73, 166, 226, 358, 423, 119, 485, 132, 416, 63, 487, 231, 218, 157, 284, 438, 242, 355, 272, 145, 461, 216, 344, 98, 266, 299, 133, 486, 215, 115, 436, 235, 309, 91, 456, 347, 183, 60, 385, 488, 203, 280, 116, 388, 476, 323, 195, 332, 50, 161, 86, 326, 238, 164, 126, 446, 207, 407, 221, 104, 415, 51, 152, 431, 379, 217, 496, 319, 475, 245, 243, 354, 370, 131, 463, 442, 421, 321, 343, 246, 146, 121, 81, 428, 320, 422, 308, 154, 451, 282, 386, 481, 170, 72, 405, 151, 479, 58, 95, 219, 190, 187, 298, 478, 122, 271, 454, 377, 233, 409, 408, 77, 92, 265, 464, 79, 155, 196, 111, 144, 270, 411, 83, 443, 490, 469, 351, 214, 286, 184, 227, 357, 363, 140, 296, 406, 250, 495, 483, 182, 390, 340, 480, 473, 327, 85, 304, 291, 269, 426, 375, 228, 314, 300, 89, 297, 96, 459, 93, 420, 162, 110, 281, 457, 260, 237, 413, 158, 400, 301, 333, 223, 181, 361, 68, 108, 435, 59, 198, 268, 325, 262, 193, 305, 254, 498, 293, 167, 383, 397, 259, 65, 128, 78, 492, 493, 94, 255, 468, 169, 141, 367, 365, 378, 306, 402, 84, 497, 261, 191, 404, 69, 372, 66, 163, 317, 387, 337, 212, 204, 303, 295, 240, 441, 381, 107, 138, 316, 335, 466, 398, 462, 448, 467, 156, 205, 374, 273, 248, 90, 241, 339, 450, 70, 61, 102, 197, 56, 249, 342, 188, 148, 173, 432, 180, 168, 208, 80, 329, 209, 313, 324, 139, 213, 341, 369, 124, 87, 353, 178, 67, 403, 136, 239, 220, 160, 172, 186, 74, 477, 427, 194, 174, 460, 185, 109, 274, 287, 176, 434, 437, 360, 366, 127, 331, 399, 97, 439, 82, 264, 153, 444, 417, 159, 328, 289, 71, 253, 449, 143, 352, 112, 229, 101, 424, 129, 371, 310, 76, 192, 445, 376, 290, 494, 472, 171, 64, 252, 224, 429, 54, 150, 263, 285, 414, 222, 311, 474, 75, 52, 175, 236, 225, 200, 189, 318, 179, 134, 251, 465, 234, 384, 100, 359, 419, 103, 452, 247, 336, 201, 396, 294, 410, 380]
//testVal, size 434, between 500 - 1000
// var testVal = [839, 648, 914, 951, 616, 950, 774, 907, 988, 545, 566, 841, 968, 942, 670, 510, 754, 892, 870, 568, 943, 559, 693, 724, 856, 520, 922, 955, 966, 740, 967, 654, 539, 843, 867, 835, 723, 739, 552, 604, 590, 894, 725, 701, 857, 656, 502, 621, 1000, 829, 676, 673, 784, 956, 900, 838, 712, 547, 526, 694, 886, 987, 806, 876, 855, 860, 887, 952, 909, 658, 634, 666, 917, 682, 611, 858, 753, 614, 821, 533, 878, 916, 859, 930, 554, 782, 543, 540, 822, 830, 736, 918, 548, 610, 744, 891, 793, 960, 801, 906, 883, 507, 901, 600, 959, 647, 827, 864, 836, 633, 996, 940, 994, 978, 728, 592, 742, 759, 643, 992, 624, 810, 764, 848, 831, 912, 730, 945, 921, 719, 506, 516, 760, 501, 790, 684, 720, 969, 849, 803, 607, 659, 929, 999, 690, 668, 641, 818, 632, 962, 903, 628, 546, 638, 879, 928, 981, 587, 884, 695, 557, 812, 636, 589, 585, 700, 731, 893, 872, 773, 672, 653, 963, 823, 995, 958, 645, 588, 542, 808, 834, 944, 541, 844, 665, 667, 525, 620, 805, 948, 569, 594, 972, 729, 651, 609, 705, 927, 997, 881, 851, 556, 710, 617, 866, 957, 513, 561, 577, 644, 813, 642, 989, 939, 706, 899, 794, 591, 889, 582, 646, 741, 796, 674, 524, 888, 570, 584, 985, 560, 680, 785, 832, 574, 671, 500, 660, 511, 820, 599, 847, 778, 974, 640, 816, 745, 593, 603, 737, 874, 515, 627, 771, 799, 718, 807, 897, 608, 722, 869, 877, 767, 652, 657, 517, 623, 612, 537, 865, 578, 795, 531, 601, 947, 571, 703, 709, 573, 761, 854, 613, 979, 814, 781, 565, 788, 936, 982, 965, 615, 976, 669, 655, 933, 681, 549, 763, 896, 755, 862, 804, 512, 696, 752, 534, 691, 597, 777, 555, 986, 535, 688, 726, 626, 553, 532, 828, 697, 786, 746, 579, 635, 738, 998, 586, 971, 564, 544, 980, 775, 650, 991, 661, 734, 783, 970, 508, 538, 850, 733, 583, 575, 606, 993, 798, 522, 567, 750, 845, 880, 727, 595, 902, 639, 757, 920, 596, 937, 770, 663, 550, 873, 505, 895, 630, 842, 521, 662, 692, 826, 715, 743, 923, 562, 840, 519, 905, 707, 619, 904, 677, 735, 631, 708, 678, 766, 837, 949, 846, 679, 954, 622, 581, 932, 890, 817, 711, 675, 756, 961, 504, 732, 815, 925, 926, 762, 825, 721, 833, 885, 527, 637, 685, 809, 683, 536, 580, 576, 934, 824, 853, 523, 717, 772, 852, 776, 898, 699, 716, 563, 514, 649, 792, 871]
//testVal, size 434, between 1000 - 5000 
//var testVal = [2305, 2050, 3881, 3076, 3014, 3453, 2937, 3539, 2530, 2875, 4546, 1380, 4523, 3486, 4186, 1921, 1080, 3023, 2496, 2271, 4594, 4853, 4132, 1866, 3153, 1864, 1931,
//3170, 2219, 3047, 3259, 3798, 3918, 3363, 1666, 1300, 4658, 4799, 3718, 2138, 3482, 4641, 4738, 1579, 3271, 3516, 1576, 1037, 2155, 2003, 1101, 2299, 1610, 2681, 3426, 3858, 2561, 1146, 3518, 1411, 1713, 4200, 4675, 3285, 3968, 1947, 4018, 4430, 4663, 3580, 4566, 2871, 4688, 1473, 1180, 4903, 4034, 1197, 2087, 2495, 4473, 2023, 2068, 3617, 1193, 2000, 3609, 2120, 3542, 1984, 4136, 2964, 2212, 1959, 1751, 4467, 2721, 3102, 4703, 1064, 2469, 2209, 4839, 4734, 3098, 2843, 2799, 4009, 1895, 4955, 3168, 2370, 3647, 2763, 1132, 3321, 2340, 1891, 1775, 4267, 1001, 2332, 1561, 3671, 1863, 2668, 4863, 1531, 1738, 3624, 3576, 2760, 3796, 4774, 2198, 1376, 1618, 4975, 4314, 1314, 2472, 3872, 1991, 2879, 2993, 4680, 1106, 2933, 1184, 3651, 1994, 3331, 1435, 1024, 3673, 2052, 2939, 4482, 4709, 4278, 2624, 1581, 2325, 3823, 2518, 4208, 1501, 4987, 4766, 3528, 1374, 2617, 4455, 1093, 3877, 3337, 1283, 3498, 3220, 1296, 4096, 2130, 1367, 3591, 3785, 4142, 4395, 4608, 4252, 2724, 4401, 3121, 1420, 1412, 1924, 4064, 2822, 3227, 3964, 1899, 3494, 4001, 4842, 1636, 2699, 3582, 3821, 4460, 3898, 4526, 2883, 2216, 4046, 3152, 4346, 2603, 2025, 3492, 1273, 3989, 3358, 3727, 1756, 4815, 2945, 3700, 3319, 4451, 4387, 4153, 2828, 3094, 2558, 1263, 3969, 3986, 2678, 2791, 2662, 1498, 1288, 4256, 1050, 4937, 2148, 1086, 3366, 4275, 1805, 3103, 2019, 2104, 3029, 2812, 2199, 1424, 4122, 2947, 2848, 3117, 4285, 4038, 4918, 2140, 4777, 1398, 3441, 3185, 2638, 2339, 3914, 4216, 3774, 2062, 1322, 2916, 3003, 2926, 2069, 1219, 2258, 2569, 1117, 2280, 1714, 1502, 3424, 4924, 1447, 3524, 4075, 1810, 2220, 4972, 3955, 2319, 1591, 4117, 1684, 1731, 3081, 1284, 2368, 3169, 3280, 3734, 1881, 4961, 1904, 2930, 2250, 4893, 3956, 4659, 2042, 4596, 3019, 3184, 2074, 2048, 3100, 4213, 1416, 3512, 2228, 1448, 4338, 4812, 4783, 3745, 3719, 2467, 3217, 2657, 3396, 3241, 3408, 3304, 4557, 2126, 1351, 3578, 2855, 2440, 1716, 3652, 1659, 4519, 3160, 1095, 4542, 4240, 1141, 4712, 2388, 2287, 1462, 2090, 4421, 3236, 2431, 1665, 3050, 3685, 1698, 4224, 1349, 4543, 1052, 1551, 3040, 1771, 4751, 3947, 1167, 4497, 2801, 3658, 2918, 2425, 4795, 1511, 1584, 2895, 4144, 3809, 3465, 4261, 3763, 4063, 3846, 2462, 2013, 2562, 1044, 4003, 3161, 4598, 1687, 3339, 3440, 1762, 3699, 2281, 1277, 2851, 3228, 3113, 4630, 4156, 4051, 4549, 3393, 3219, 4660, 4173, 1202, 4234, 4438, 3314, 2498, 4809, 2092, 2665, 3556, 3407, 3214, 1598, 2005, 4533, 2524, 2608, 2961, 3253]
//testVal, size 434, between 5000 - 11000
//var testVal = [9129, 10192, 10250, 6768, 9651, 5784, 9445, 9341, 9794, 9253, 5719, 8226, 8569, 6255, 7454, 9853, 10537, 8479, 9403, 5735, 10017, 5312, 9371, 8299, 6047, 5126, 9039, 10304, 5332, 10223, 8516, 5465, 8342, 6348, 9907, 9683, 7636, 8365, 7010, 6064, 6961, 8723, 5188, 6278, 10698, 10826, 7568, 6853, 9238, 6870, 8782, 8530, 8133, 5872, 6781, 10529, 9207, 9042, 6646, 8621, 6072, 7921, 5620, 7225, 8472, 9154, 6078, 5565, 6916, 9224, 6443, 9555, 6797, 5275, 5717, 5983, 5771, 10572, 6213, 5398, 8670, 10104, 10758, 9070, 7350, 10153, 6134, 9372, 8900, 10642, 8054, 8457, 6722, 9721, 9130, 8427, 10545, 6556, 9501, 10087, 9494, 9127, 8922, 10561, 8838, 10592, 8756, 10824, 10266, 5435, 8662, 9026, 9512, 8943, 10794, 5659, 6907, 8682, 10938, 6786, 9043, 9217, 9339, 9305, 6887, 7787, 6232, 10333, 5955, 7748, 6287, 5256, 10557, 8077, 10132, 6709, 8948, 10767, 6989, 8471, 5778, 7903, 7402, 10882, 7245, 6369, 8341, 5190, 10234, 5243, 10423, 5621, 5083, 6776, 5564, 6143, 7697, 9724, 5068, 8321, 6883, 9959, 10703, 5382, 7962, 7632, 9674, 5350, 6755, 10901, 10771, 8826, 10460, 6106, 9419, 8695, 9604, 9873, 6270, 8381, 6482, 9600, 10046, 6523, 5205, 8319, 7220, 6463, 5640, 9287, 10477, 10821, 7758, 8171, 7829, 9722, 10955, 10965, 6439, 9174, 9252, 5446, 8440, 5282, 8382, 10833, 9404, 5400, 7867, 8944, 8834, 8870, 8428, 7786, 10419, 7480, 7616, 7686, 8333, 5238, 5261, 8124, 8445, 10738, 10942, 6455, 7301, 7667, 7163, 8221, 5519, 6674, 8741, 9146, 5077, 7057, 6051, 5932, 10762, 8320, 8097, 5959, 9716, 7148, 8329, 6650, 9237, 10479, 10492, 8364, 5154, 7106, 10717, 8383, 10651, 8273, 8040, 6728, 8533, 9978, 9230, 9644, 9247, 10485, 7424, 9116, 10235, 10401, 5046, 10720, 10527, 10636, 10337, 6098, 9917, 5793, 5357, 7167, 5024, 10160, 8031, 7340, 8629, 8540, 7481, 9045, 10001, 9969, 8735, 10760, 6865, 8728, 9693, 10894, 9714, 8845, 6227, 7289, 10369, 10978, 6388, 5580, 6331, 8327, 10675, 6334, 6842, 7669, 5460, 7986, 8379, 6793, 5980, 8229, 7521, 9273, 5449, 5759, 9342, 6831, 7236, 5361, 10169, 9111, 10218, 6080, 8394, 10128, 8408, 5416, 10656, 9758, 5510, 5171, 6752, 7531, 9994, 9410, 8972, 7147, 8604, 6724, 9628, 5865, 9063, 7767, 8913, 10670, 6195, 6937, 7139, 10739, 6685, 8808, 7599, 6829, 9214, 9406, 6087, 10707, 5499, 9568, 10520, 8602, 10827, 8241, 7850, 8023, 9007, 10541, 10995, 8938, 7486, 6197, 5948, 9991, 6526, 5822, 5958, 9754, 10393, 5830, 8205, 6730, 6737, 7138, 8093, 8234, 6897, 7426, 10626, 10886, 
// 7608, 10631, 5871, 5671, 8375, 8786, 9431, 5857, 10119, 9574, 5090, 6508, 5210, 6815, 8244, 8523, 7275, 8118, 5321, 6176, 6462, 5280, 6045, 6280, 9741, 8991, 8396, 9709, 9280, 8750, 7271, 8527, 5464, 8983, 10211, 9050, 5228, 9642, 10209, 8683, 5088, 5055]
//console.log("length: ", base_data.features.length)

// //append properties with testdata
// for(var i=0; i<base_data.features.length;i++){
//     var feature = base_data.features[i]
//     feature.properties[keyValue] = testVal[i]
//     //console.log("Test: ",feature.properties[keyValue]

// }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function calculate_spatial_auto_correlation(base_data, key) {
    //measuring execution time
    const startTime = performance.now()
    //calculate spatial autocorrelation
    try {
        //throw error
        console.log("calculate Spatial Auto Correlation...")
        //console.log(spatialAutocorrelation)
        //Originaler Testdatensatz der Anwendung funktioniert (siehe github):
        var results = await spatialAutocorrelation(base_data, key, {
            method: 'local_moran_i'
        })
        // var results = spatialAutocorrelation(base_data,keyValue,{
        //     method: "local_moran_i"
        // })
        console.log('spatial auto correlation: ', results)
        const endTime = performance.now()
        //make results global
        //window.results = results
        console.log('Execution time:', endTime - startTime, ' millisec')
        return results
    }
    catch (err) {
        console.log("something went wrong: ", err)
    }
}

//}