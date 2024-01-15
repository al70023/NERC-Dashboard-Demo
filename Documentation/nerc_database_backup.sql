PGDMP      %                 |            Nerc_Dashboard_Demo_DB    16.1    16.1 0    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    Nerc_Dashboard_Demo_DB    DATABASE     �   CREATE DATABASE "Nerc_Dashboard_Demo_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 (   DROP DATABASE "Nerc_Dashboard_Demo_DB";
                postgres    false            �            1259    16479    applications    TABLE     �   CREATE TABLE public.applications (
    id integer NOT NULL,
    name character varying(256),
    type character varying(256)
);
     DROP TABLE public.applications;
       public         heap    postgres    false            �            1259    16478    applications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.applications_id_seq;
       public          postgres    false    223            �           0    0    applications_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;
          public          postgres    false    222            �            1259    16488    applications_to_asset    TABLE     �   CREATE TABLE public.applications_to_asset (
    application_id integer,
    asset_id integer,
    version character varying(256),
    initial_install date,
    upgrade_date date
);
 )   DROP TABLE public.applications_to_asset;
       public         heap    postgres    false            �            1259    16400    asset_inventory    TABLE       CREATE TABLE public.asset_inventory (
    id integer NOT NULL,
    status character varying(256),
    serial_number character varying(256),
    name character varying(256),
    "IPs" character varying(256),
    "OS" character varying(256),
    team character varying(256),
    tech_owner character varying(256),
    model_type character varying(256),
    manufacturer character varying(256),
    model character varying(256),
    "group" character varying(256),
    bes_class character varying(256),
    impact_rating character varying(256),
    rack character varying(256),
    location character varying(256),
    psp_id character varying(256),
    esp_id character varying(256),
    function character varying(256),
    commission_date date,
    decommission_date date
);
 #   DROP TABLE public.asset_inventory;
       public         heap    postgres    false            �            1259    16399    asset_inventory_id_seq    SEQUENCE     �   CREATE SEQUENCE public.asset_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.asset_inventory_id_seq;
       public          postgres    false    216            �           0    0    asset_inventory_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.asset_inventory_id_seq OWNED BY public.asset_inventory.id;
          public          postgres    false    215            �            1259    16509    change_controls    TABLE     a  CREATE TABLE public.change_controls (
    id integer NOT NULL,
    "CHG_number" character varying(256),
    "CHG_date" date,
    security_update character varying(12),
    security_review_date date,
    description character varying(256),
    test_approve_date date,
    test_install_date date,
    test_worknotes character varying(256),
    before_test_ss character varying(256),
    after_test_ss character varying(256),
    prod_approve_date date,
    prod_install_date date,
    prod_worknotes character varying(256),
    before_prod_ss character varying(256),
    after_prod_ss character varying(256)
);
 #   DROP TABLE public.change_controls;
       public         heap    postgres    false            �            1259    16508    change_controls_id_seq    SEQUENCE     �   CREATE SEQUENCE public.change_controls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.change_controls_id_seq;
       public          postgres    false    226            �           0    0    change_controls_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.change_controls_id_seq OWNED BY public.change_controls.id;
          public          postgres    false    225            �            1259    16409    ports    TABLE     �   CREATE TABLE public.ports (
    id integer NOT NULL,
    number character varying(256),
    name character varying(256),
    allows character varying(256),
    description character varying(256)
);
    DROP TABLE public.ports;
       public         heap    postgres    false            �            1259    16408    ports_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.ports_id_seq;
       public          postgres    false    218            �           0    0    ports_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.ports_id_seq OWNED BY public.ports.id;
          public          postgres    false    217            �            1259    16463    ports_to_asset    TABLE     �   CREATE TABLE public.ports_to_asset (
    port_id integer,
    asset_id integer,
    justification character varying(256),
    vendor_docs character varying(256)
);
 "   DROP TABLE public.ports_to_asset;
       public         heap    postgres    false            �            1259    16450    software_updates_to_asset    TABLE     m  CREATE TABLE public.software_updates_to_asset (
    id integer NOT NULL,
    asset_id integer,
    patch_version character varying(256),
    source character varying(256),
    model character varying(256),
    "OS" character varying(256),
    date_reviewed date,
    date_installed date,
    "CHG_ticket" character varying(256),
    notes character varying(256)
);
 -   DROP TABLE public.software_updates_to_asset;
       public         heap    postgres    false            �            1259    16449     software_updates_to_asset_id_seq    SEQUENCE     �   CREATE SEQUENCE public.software_updates_to_asset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.software_updates_to_asset_id_seq;
       public          postgres    false    220            �           0    0     software_updates_to_asset_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.software_updates_to_asset_id_seq OWNED BY public.software_updates_to_asset.id;
          public          postgres    false    219            9           2604    16482    applications id    DEFAULT     r   ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);
 >   ALTER TABLE public.applications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            6           2604    16403    asset_inventory id    DEFAULT     x   ALTER TABLE ONLY public.asset_inventory ALTER COLUMN id SET DEFAULT nextval('public.asset_inventory_id_seq'::regclass);
 A   ALTER TABLE public.asset_inventory ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            :           2604    16512    change_controls id    DEFAULT     x   ALTER TABLE ONLY public.change_controls ALTER COLUMN id SET DEFAULT nextval('public.change_controls_id_seq'::regclass);
 A   ALTER TABLE public.change_controls ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            7           2604    16412    ports id    DEFAULT     d   ALTER TABLE ONLY public.ports ALTER COLUMN id SET DEFAULT nextval('public.ports_id_seq'::regclass);
 7   ALTER TABLE public.ports ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            8           2604    16453    software_updates_to_asset id    DEFAULT     �   ALTER TABLE ONLY public.software_updates_to_asset ALTER COLUMN id SET DEFAULT nextval('public.software_updates_to_asset_id_seq'::regclass);
 K   ALTER TABLE public.software_updates_to_asset ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �          0    16479    applications 
   TABLE DATA           6   COPY public.applications (id, name, type) FROM stdin;
    public          postgres    false    223   �?       �          0    16488    applications_to_asset 
   TABLE DATA           q   COPY public.applications_to_asset (application_id, asset_id, version, initial_install, upgrade_date) FROM stdin;
    public          postgres    false    224   �@       �          0    16400    asset_inventory 
   TABLE DATA           �   COPY public.asset_inventory (id, status, serial_number, name, "IPs", "OS", team, tech_owner, model_type, manufacturer, model, "group", bes_class, impact_rating, rack, location, psp_id, esp_id, function, commission_date, decommission_date) FROM stdin;
    public          postgres    false    216   B       �          0    16509    change_controls 
   TABLE DATA           %  COPY public.change_controls (id, "CHG_number", "CHG_date", security_update, security_review_date, description, test_approve_date, test_install_date, test_worknotes, before_test_ss, after_test_ss, prod_approve_date, prod_install_date, prod_worknotes, before_prod_ss, after_prod_ss) FROM stdin;
    public          postgres    false    226   �D       �          0    16409    ports 
   TABLE DATA           F   COPY public.ports (id, number, name, allows, description) FROM stdin;
    public          postgres    false    218   {F       �          0    16463    ports_to_asset 
   TABLE DATA           W   COPY public.ports_to_asset (port_id, asset_id, justification, vendor_docs) FROM stdin;
    public          postgres    false    221   �G       �          0    16450    software_updates_to_asset 
   TABLE DATA           �   COPY public.software_updates_to_asset (id, asset_id, patch_version, source, model, "OS", date_reviewed, date_installed, "CHG_ticket", notes) FROM stdin;
    public          postgres    false    220   RI       �           0    0    applications_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.applications_id_seq', 10, true);
          public          postgres    false    222            �           0    0    asset_inventory_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.asset_inventory_id_seq', 33, true);
          public          postgres    false    215            �           0    0    change_controls_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.change_controls_id_seq', 19, true);
          public          postgres    false    225            �           0    0    ports_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.ports_id_seq', 10, true);
          public          postgres    false    217            �           0    0     software_updates_to_asset_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.software_updates_to_asset_id_seq', 53, true);
          public          postgres    false    219            B           2606    16486    applications applications_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.applications DROP CONSTRAINT applications_pkey;
       public            postgres    false    223            <           2606    16407 $   asset_inventory asset_inventory_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.asset_inventory
    ADD CONSTRAINT asset_inventory_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.asset_inventory DROP CONSTRAINT asset_inventory_pkey;
       public            postgres    false    216            D           2606    16516 $   change_controls change_controls_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.change_controls
    ADD CONSTRAINT change_controls_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.change_controls DROP CONSTRAINT change_controls_pkey;
       public            postgres    false    226            >           2606    16416    ports ports_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.ports
    ADD CONSTRAINT ports_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.ports DROP CONSTRAINT ports_pkey;
       public            postgres    false    218            @           2606    16457 8   software_updates_to_asset software_updates_to_asset_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.software_updates_to_asset
    ADD CONSTRAINT software_updates_to_asset_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.software_updates_to_asset DROP CONSTRAINT software_updates_to_asset_pkey;
       public            postgres    false    220            H           2606    16491 ?   applications_to_asset applications_to_asset_application_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.applications_to_asset
    ADD CONSTRAINT applications_to_asset_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id);
 i   ALTER TABLE ONLY public.applications_to_asset DROP CONSTRAINT applications_to_asset_application_id_fkey;
       public          postgres    false    224    4674    223            I           2606    16496 9   applications_to_asset applications_to_asset_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.applications_to_asset
    ADD CONSTRAINT applications_to_asset_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.asset_inventory(id);
 c   ALTER TABLE ONLY public.applications_to_asset DROP CONSTRAINT applications_to_asset_asset_id_fkey;
       public          postgres    false    4668    224    216            F           2606    16473 +   ports_to_asset ports_to_asset_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ports_to_asset
    ADD CONSTRAINT ports_to_asset_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.asset_inventory(id);
 U   ALTER TABLE ONLY public.ports_to_asset DROP CONSTRAINT ports_to_asset_asset_id_fkey;
       public          postgres    false    221    4668    216            G           2606    16468 *   ports_to_asset ports_to_asset_port_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ports_to_asset
    ADD CONSTRAINT ports_to_asset_port_id_fkey FOREIGN KEY (port_id) REFERENCES public.ports(id);
 T   ALTER TABLE ONLY public.ports_to_asset DROP CONSTRAINT ports_to_asset_port_id_fkey;
       public          postgres    false    218    4670    221            E           2606    16458 A   software_updates_to_asset software_updates_to_asset_asset_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.software_updates_to_asset
    ADD CONSTRAINT software_updates_to_asset_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.asset_inventory(id);
 k   ALTER TABLE ONLY public.software_updates_to_asset DROP CONSTRAINT software_updates_to_asset_asset_id_fkey;
       public          postgres    false    4668    216    220            �   �   x�MO�N�@���b� ޔ����`d����Kη��!O,�f^���`��{�b�:2�s�OQ�����RڨI?_�y�-,G��殡΍���&�e'����f]`ɝV��ܸ[(��d�Pb8	��u{���`�i�Xj���*�n�6႓��ݟ��~qk��XR���i�<k48&�s��a#)���r'��v���.���n��8� -�hpι_�kT      �     x��TY�!�ֻ<#�_bN��1�D{�0���������0b�D�g/�G ��%~��Ą|C����3�)ć'^�ڍ�ͯ��2P�>�EH79c_J5>x��`B}Y� n��&���ƚf�)ƚh�jӕ�����Y芅.Z �n�a6C���!9��L�6�?����^V(ؒ`J��_8��Q?�M�_�F�#'*�%���I?+�3R��[+nъk�&x�MPN���*���A�OQ����gI鳸n� ��efC��~d4����?)�
      �   �  x����r�0�����H2�:�4��d���vr!F	���MH�>���6��$K�����o�x0s�� �{�Ps�,{���q= ���<Y�]�G�Ȗ1�#��n�:�DR��o�S4�Wp+V,BrV�����M̒&�2��������#�{y�!CW�)��Ś��j���bj0�<��[�-[��!��<\�/&��Lx
4�`��H�x�4�-xT(PG���MD��ȩ~�_%p�V|WZ��_� D��XJK�U=�h�J-D�0q̳������"���Fj�����DÏy�-�<g�	��ߡiVJ�/��]e��
[��lUw7���'lP�F�������R�f�3�l?ۋ$B��U?����B��,r����e�W<b�����)�n���v\�Oy���p|kp�,�����(�y�������\�j�����U�*n}G�H#�-E��D<9��w.�������^���v���_�L�Y�H��t@�k���,�Q��eP�M�/@&�d$�!��vB"�|5��,KP�(���)����-��TM{)���0�� �
cb��c=k��墯�=K���bf�#�19W?&=���~L��cZ�c�~L�_C&=���L�6dZ6d��w"��V�]M�*7���	;�v6�z;[�19���"����
	�	b6�T"A��H���2a��u�Yy�$�nIª$�a��5�˲Of����a�\P,      �     x��Mn�0����@�m~��]E]dS)
N�Jl�M�ܾ�����KX^��OØ����H�,/�`"�1��rܓC�,�������z����D]+��_�1Zҏ.�m�?��h7�.��v�~,ӂ�uT�o5}��Q;ֵ��4vݍ������Z�do�����1����w2�Q��W�ݷ��<yL3��֫~c�T����s�>U�{��0�W��|�*�Z�U��AL>y����3��1���Vyq䅚���x��J�W���W��+^������^�A̼B�_��8��|ҝ��]�ǳn��a�q����nX�9��/'��7�ji�B�mr+�[�޲\���o�ܞ�mB-�!߶����b2*Ç�p�8���͋      �      x�e��r�0�ϛ��'�4,��8���^2t�!aBhǷoD��;�����!簭k	���|��y�N0xݶ�a	���!�L�;& I@���(j&O����p�.��u,!�5�۹#�.4��P�c$�r�R�:�R�k��ؒ�+���^��m���Н��q{���f	ޘ���C&��|D����X�t�\�@=[_qPU)gbѫ(�:��V��'�Q��B�:�n�����󅇉�wڞ���>_cрy�      �   �  x����n�0���)�I ;�
q J�^LX�b#��������x�3����$M�I2�lV�d�{�ĕ��!w!��+sފV���&㵯�d�����Pyv�*`���s�z={�;��'�˒����~����;��9w��==&���0nKXt��ZWGQں>��le�Oc�p��c�?&8򮢋>�ܭ���v��WG�i��;�>������gùF]�{<�jgm?�h�_.:��W���F�Kｳ��&��eG��H�	�#av$Ď�fG��H�ˎ��Q(;
fG��(�͎��Q(;E,;�N��S��;Y��1�9�ArB�y���
B ��	'D_>�n�
�2��	Q�/؉\� O���8�`:l���w2��[�Ы:��	�Q<��g0�<�a�����������?���}(��4ɇ�_�|~����/�2��      �   �  x����R1��7O�c�^{���Z�@�yz`i3�$L�����Z����m�����,Y�δ�N�5��]5�],�eg���ۇ��?��>���?���.3P`FJ�l�l||��ʮ���r��=���n��耋��D���Ё�VvQ-���d~S�����G5�櫁a'@C/'@�.8��n�	�N0�� �z��'��ɌW^�����p��#�dbU1^�P��z���d};YUG6
U46.�v��Q�y|5 ��/û鯁g�/|/�Z�n��l�EY���u��L{�\��S�p�D�pDLX,�J�Z\�}N�g��t��5㙟_�&7�� �K
C�����lC B6�Xqn�T�r	��ٰZ��<$縘|@�����0z�q�����j�����k];�f�e�òM@˽B�ch����	=��^��5�wO�MT7v�vaug3�t���GD�E�B�L�N8�r��ir%�)Q���O��eۙmub�W.� R�09L���x�.z�%A ����e���/�QoX����
v���}���E�X�c��V�`#��關�����`_ֽ�K��1� u�?�04�U��?!�q��s�����∊}R� ���x_���L����/���|���NJ��L`G0�&$$:�$�^mmB�Ƌ32�2�u���q�k���Ę.6ۋ����v��F�+�t]XNb��3#p���i\	 �4ms�"���)��='�i;����sX���7��	�����A�)�a�}��z���V��H{p}�O����mM�;���\MAFڣ��;FWS��v����U���[���Y�n�^o;�H|���z��p����^�G�R�M��&;�ݗp!%PD��)���2�,y��q҇��pE䋮۬��-�֑��z��mR�}f��xC.#�[J�K�Vmق�F�~\	Ͻ�'/[��8�o\>��?/�c     